import type { EventConfig } from "@/lib/events/types";
import { JUNIORS_2024 } from "./2024-juniors";
import { ADULTS_2025 } from "./2025-adults";
import { JUNIORS_2025 } from "./2025-juniors";
import { PHOENIX_2025 } from "./2025-phoenix";
import { PWC_2026 } from "./2026-pwc";

/** Every competition. Add new events here (see docs/ADDING_AN_EVENT.md). */
export const EVENT_CONFIGS: EventConfig[] = [PWC_2026, JUNIORS_2025, ADULTS_2025, PHOENIX_2025, JUNIORS_2024];
