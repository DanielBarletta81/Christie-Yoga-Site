import PlannerBoard from '../../../components/planner/PlannerBoard';
import { ritualCatalog } from '../../../lib/content/rituals';

export default function PlannerPage() {
  return <PlannerBoard catalog={ritualCatalog} />;
}
