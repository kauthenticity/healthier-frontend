export interface IDiagnosticResult {
  type: string;
  diagnostic_result: {
    id: string;
    illustration: string;
    h1: string;
    title: string;
    h2: string;
    severity: number;
    explanation: string[];
    cause: {
      tag_flag: number;
      tags?: { cause: string; details: string[] }[];
      detail: string[];
    };
    solutions: { title: string; detail: string; emoji: string }[];
    medicine_flag: number;
    medicines?: {
      image: string;
      name: string;
      efficacy: string;
      caution: { h1: string; h2: string; is_colored: string[] };
      sideeffects: { name: string; emoji: string }[];
    }[];
    treatments?: { title: string; detail: string }[];
  };
}
