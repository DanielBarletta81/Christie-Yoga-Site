#!/usr/bin/env python3
"""Basic project health checks.
- Ensures required env vars are set
- Warns on committed .env files
- Confirms npm lockfile exists
"""
from __future__ import annotations

import os
from pathlib import Path

REQUIRED = ["NEXT_PUBLIC_WORDPRESS_API_URL", "NEXT_PUBLIC_FREE_CDN_BASE"]


def main() -> int:
  missing = [key for key in REQUIRED if not os.getenv(key)]
  if missing:
    print(f"Missing required env vars: {', '.join(missing)}")
    return 1

  repo_root = Path(__file__).resolve().parents[2]
  env_file = repo_root / ".env"
  if env_file.exists():
    print("Warning: .env exists in repo root. Ensure it is not committed.")

  lockfile = repo_root / "package-lock.json"
  if not lockfile.exists():
    print("Missing package-lock.json. Run npm install to generate.")
    return 1

  print("Healthcheck passed.")
  return 0


if __name__ == "__main__":
  raise SystemExit(main())
