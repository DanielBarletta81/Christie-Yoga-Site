'use client';

import { useState } from 'react';
import Container from '../../../components/ui/Container';
import { CDN_BASE } from '../../../lib/media/cdn';
import kitchenData from '../../../content/data/ayurveda-kitchen.json';
import ayurvedaData from '../../../content/data/ayurveda.json';

// ─── Dosha pill ────────────────────────────────────────────────────────────────
const DOSHA_COLORS = { vata: '#546E7A', pitta: '#C62828', kapha: '#6D4C41' };

function DoshaPill({ dosha, effect }) {
  const color = DOSHA_COLORS[dosha] || '#888';
  const dimmed = effect === 'neutral' || effect === 'may increase';
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] uppercase tracking-[0.25em]"
      style={{
        backgroundColor: dimmed ? '#f3f0ed' : `${color}18`,
        color: dimmed ? '#999' : color,
        border: `1px solid ${dimmed ? '#e5e0da' : color + '40'}`,
      }}
    >
      {dosha}
      {effect === 'balances' ? ' ↓' : effect === 'may increase' ? ' ↑' : ' ·'}
    </span>
  );
}

// ─── Apothecary jar SVG ─────────────────────────────────────────────────────────
function ApothecaryJar({ color, category, active }) {
  const fillOpacity = active ? '0.85' : '0.35';
  const isFlower = category === 'flower';
  const isRoot   = category === 'root';

  return (
    <svg viewBox="0 0 80 100" className="h-full w-full">
      {/* Jar body */}
      <rect x="18" y="32" width="44" height="52" rx="6"
        fill={color} fillOpacity={fillOpacity} stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
      {/* Jar neck */}
      <rect x="24" y="20" width="32" height="14" rx="4"
        fill={color} fillOpacity={fillOpacity * 0.8} stroke={color} strokeWidth="1" strokeOpacity="0.4" />
      {/* Lid */}
      <rect x="20" y="14" width="40" height="9" rx="4"
        fill="#3d3530" fillOpacity={active ? '0.9' : '0.4'} />
      {/* Shine */}
      <rect x="25" y="38" width="8" height="28" rx="3"
        fill="white" fillOpacity="0.18" />
      {/* Content symbol */}
      {isFlower ? (
        <g transform="translate(40,62)">
          <circle r="5" fill="white" fillOpacity="0.25" />
          {[0,60,120,180,240,300].map((deg) => (
            <ellipse
              key={deg}
              cx={Math.round(Math.cos((deg * Math.PI) / 180) * 9)}
              cy={Math.round(Math.sin((deg * Math.PI) / 180) * 9)}
              rx="4" ry="2.5"
              fill="white" fillOpacity="0.2"
              transform={`rotate(${deg},${Math.round(Math.cos((deg * Math.PI) / 180) * 9)},${Math.round(Math.sin((deg * Math.PI) / 180) * 9)})`}
            />
          ))}
        </g>
      ) : isRoot ? (
        <g transform="translate(40,62)">
          <line x1="0" y1="-10" x2="0" y2="10" stroke="white" strokeWidth="2" strokeOpacity="0.3" />
          <line x1="-6" y1="-3" x2="6" y2="-3" stroke="white" strokeWidth="1.5" strokeOpacity="0.25" />
          <line x1="-5" y1="3" x2="5" y2="3" stroke="white" strokeWidth="1.5" strokeOpacity="0.25" />
        </g>
      ) : (
        <g transform="translate(40,62)">
          <circle r="7" fill="white" fillOpacity="0.15" />
          <circle r="3" fill="white" fillOpacity="0.2" />
        </g>
      )}
    </svg>
  );
}

// ─── Ingredient Card ────────────────────────────────────────────────────────────
function IngredientCard({ ingredient, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all ${
        isActive
          ? 'border-stone-400 bg-white shadow-md scale-105'
          : 'border-stone-200/70 bg-white/60 hover:bg-white/90 hover:shadow-sm'
      }`}
    >
      <div className="h-16 w-12">
        <ApothecaryJar color={ingredient.color} category={ingredient.category} active={isActive} />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-stone-500">{ingredient.category}</p>
        <p className="mt-0.5 text-sm font-medium text-stone-800">{ingredient.name}</p>
        <p className="mt-0.5 text-[10px] italic text-stone-400">{ingredient.sanskrit}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-1">
        {Object.entries(ingredient.dosha_effect).map(([dosha, effect]) => (
          <DoshaPill key={dosha} dosha={dosha} effect={effect} />
        ))}
      </div>
    </button>
  );
}

// ─── Recipe Card ─────────────────────────────────────────────────────────────────
function RecipeCard({ recipe, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left w-full rounded-2xl border p-5 transition-all ${
        isActive
          ? 'border-stone-400 bg-white shadow-md'
          : 'border-stone-200/70 bg-white/60 hover:bg-white/90'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="mt-1 h-3 w-3 flex-shrink-0 rounded-full"
          style={{ backgroundColor: recipe.color }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">{recipe.time_of_day}</p>
          <p className="mt-1 font-medium text-stone-800">{recipe.name}</p>
          <p className="mt-0.5 text-xs text-stone-500">{recipe.subtitle}</p>
        </div>
        <span className="flex-shrink-0 text-[10px] uppercase tracking-[0.2em] text-stone-400 border border-stone-200 rounded-full px-2 py-0.5">
          {recipe.prep_time}
        </span>
      </div>
    </button>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function AyurvedaPage() {
  const ingredients = kitchenData.ingredients || [];
  const recipes     = kitchenData.recipes     || [];
  const sections    = ayurvedaData.sections   || [];

  const [activeIngredient, setActiveIngredient] = useState(ingredients[0] || null);
  const [activeRecipe,     setActiveRecipe]     = useState(null);
  const [tab, setTab]                           = useState('kitchen'); // 'kitchen' | 'foundations'

  const TAB_STYLES = (t) =>
    `rounded-full border px-5 py-2 text-xs uppercase tracking-[0.3em] transition ${
      tab === t
        ? 'border-stone-700 bg-stone-900 text-white'
        : 'border-stone-200 bg-white/70 text-stone-600 hover:bg-stone-100'
    }`;

  return (
    <main
      className="ambient-page grain-layer pb-20 pt-28"
      style={{
        '--ambient-image-1': `url('${CDN_BASE}/ayurveda.jpg')`,
        '--ambient-image-2': `url('${CDN_BASE}/healthy-start.jpeg')`,
      }}
    >
      <Container>
        {/* ── Page Header ── */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Ayurveda</p>
            <h1 className="mt-2 text-3xl font-semibold text-stone-900 sm:text-4xl">
              {kitchenData.title}
            </h1>
            <p className="mt-2 max-w-xl text-sm text-stone-500">{kitchenData.subtitle}</p>
          </div>
          <div className="flex gap-2">
            <button type="button" className={TAB_STYLES('kitchen')} onClick={() => setTab('kitchen')}>
              Kitchen
            </button>
            <button type="button" className={TAB_STYLES('foundations')} onClick={() => setTab('foundations')}>
              Foundations
            </button>
          </div>
        </div>

        {/* ══════════════════════ KITCHEN TAB ══════════════════════ */}
        {tab === 'kitchen' && (
          <div className="flex flex-col gap-10">
            {/* Intro quote */}
            <p className="max-w-2xl text-base leading-relaxed text-stone-600 italic border-l-2 border-stone-200 pl-5">
              {kitchenData.intro}
            </p>

            {/* ─── Apothecary Shelf ─── */}
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-stone-400">Apothecary — The Ingredients</p>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                {ingredients.map((ing) => (
                  <IngredientCard
                    key={ing.id}
                    ingredient={ing}
                    isActive={activeIngredient?.id === ing.id}
                    onClick={() => setActiveIngredient(ing)}
                  />
                ))}
              </div>
            </div>

            {/* ─── Ingredient Detail ─── */}
            {activeIngredient && (
              <div
                className="rounded-[28px] border bg-white/90 p-6 shadow-sm transition-all"
                style={{ borderColor: `${activeIngredient.color}40` }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="h-20 w-14 flex-shrink-0">
                      <ApothecaryJar color={activeIngredient.color} category={activeIngredient.category} active={true} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">{activeIngredient.category}</p>
                      <h2 className="mt-1 text-2xl font-semibold text-stone-900">{activeIngredient.name}</h2>
                      <p className="mt-0.5 text-sm italic text-stone-500">
                        {activeIngredient.sanskrit} · <span className="not-italic">{activeIngredient.latin}</span>
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {Object.entries(activeIngredient.dosha_effect).map(([d, e]) => (
                          <DoshaPill key={d} dosha={d} effect={e} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-stone-100 bg-stone-50 px-4 py-3 text-sm text-stone-600">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">Quality</p>
                    <p className="mt-1">{activeIngredient.quality}</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">Actions</p>
                    <ul className="mt-2 space-y-1 text-sm text-stone-600">
                      {activeIngredient.actions.map((a) => (
                        <li key={a} className="flex gap-2">
                          <span style={{ color: activeIngredient.color }}>·</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">How to Use</p>
                    <p className="mt-2 text-sm text-stone-600">{activeIngredient.use}</p>
                  </div>
                  <div className="rounded-2xl border border-stone-100 bg-stone-50/80 p-4">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">A Note</p>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600 italic">{activeIngredient.note}</p>
                  </div>
                </div>
              </div>
            )}

            {/* ─── Recipes ─── */}
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-stone-400">Recipes & Tonics</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isActive={activeRecipe?.id === recipe.id}
                    onClick={() => setActiveRecipe(activeRecipe?.id === recipe.id ? null : recipe)}
                  />
                ))}
              </div>
            </div>

            {/* ─── Recipe Detail ─── */}
            {activeRecipe && (
              <div
                className="rounded-[28px] border bg-white/90 p-6 shadow-sm"
                style={{ borderColor: `${activeRecipe.color}40` }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-100 pb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: activeRecipe.color }} />
                      <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">
                        {activeRecipe.time_of_day} · {activeRecipe.season} · {activeRecipe.prep_time}
                      </p>
                    </div>
                    <h2 className="mt-2 text-2xl font-semibold text-stone-900">{activeRecipe.name}</h2>
                    <p className="mt-0.5 text-sm text-stone-500">{activeRecipe.subtitle}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {activeRecipe.dosha_best_for.map((d) => (
                      <span
                        key={d}
                        className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white"
                        style={{ backgroundColor: DOSHA_COLORS[d] || '#888' }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid gap-6 md:grid-cols-[1fr_1.2fr]">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">Ingredients</p>
                    <ul className="mt-3 space-y-1.5 text-sm text-stone-600">
                      {activeRecipe.ingredients.map((ing) => (
                        <li key={ing} className="flex gap-2">
                          <span style={{ color: activeRecipe.color }}>·</span>
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">Method</p>
                    <ol className="mt-3 space-y-2 text-sm text-stone-600">
                      {activeRecipe.method.map((step, i) => (
                        <li key={step} className="flex gap-3">
                          <span
                            className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                            style={{ backgroundColor: activeRecipe.color }}
                          >
                            {i + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {activeRecipe.ritual_note && (
                  <div className="mt-5 rounded-2xl border border-stone-100 bg-stone-50 p-4">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">Ritual Note</p>
                    <p className="mt-2 text-sm leading-relaxed italic text-stone-600">{activeRecipe.ritual_note}</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setActiveRecipe(null)}
                  className="mt-5 text-[10px] uppercase tracking-[0.3em] text-stone-400 hover:text-stone-600 transition"
                >
                  Close ✕
                </button>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════ FOUNDATIONS TAB ══════════════════════ */}
        {tab === 'foundations' && (
          <div className="flex flex-col gap-8">
            <p className="max-w-xl text-base text-stone-600">{ayurvedaData.summary}</p>

            <div className="grid gap-6 md:grid-cols-2">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="rounded-[24px] border border-stone-200/70 bg-white/80 p-6"
                >
                  <p className="text-xs uppercase tracking-[0.35em] text-stone-400">{section.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">{section.body}</p>
                  {section.bullets?.length ? (
                    <ul className="mt-4 space-y-1.5 text-sm text-stone-500">
                      {section.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="text-stone-300">·</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>

            {/* Doshas */}
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-stone-400">The Three Doshas</p>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    name: 'Vata',
                    tone: 'Ether · Air',
                    body: 'Movement, creativity, and change. Balance with warmth, grounding, and steady routines.',
                    color: '#546E7A',
                    foods: ['Warm, oily, heavy foods', 'Root vegetables', 'Sesame, ghee', 'Warming spices'],
                  },
                  {
                    name: 'Pitta',
                    tone: 'Fire · Water',
                    body: 'Drive, digestion, and clarity. Balance with cooling foods, softness, and spaciousness.',
                    color: '#C62828',
                    foods: ['Cooling, sweet, bitter foods', 'Coconut, cucumber, leafy greens', 'Rose, coriander', 'Avoid excess chili'],
                  },
                  {
                    name: 'Kapha',
                    tone: 'Earth · Water',
                    body: 'Stability, strength, and calm. Balance with lightness, variety, and gentle energy.',
                    color: '#6D4C41',
                    foods: ['Light, dry, warm foods', 'Legumes, leafy greens', 'Warming spices generously', 'Reduce dairy and heavy sweets'],
                  },
                ].map((dosha) => (
                  <div
                    key={dosha.name}
                    className="rounded-[24px] border p-5"
                    style={{
                      borderColor: `${dosha.color}33`,
                      backgroundColor: `${dosha.color}0A`,
                    }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: dosha.color }}>
                      {dosha.tone}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-stone-900">{dosha.name}</h3>
                    <p className="mt-2 text-sm text-stone-600">{dosha.body}</p>
                    <div className="mt-4 border-t pt-4" style={{ borderColor: `${dosha.color}20` }}>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">Kitchen Guidance</p>
                      <ul className="mt-2 space-y-1 text-sm text-stone-500">
                        {dosha.foods.map((f) => (
                          <li key={f} className="flex gap-2">
                            <span style={{ color: dosha.color }}>·</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
