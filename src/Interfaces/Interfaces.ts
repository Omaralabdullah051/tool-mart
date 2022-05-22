export interface TypoProps {
  xs: "none" | "flex";
  md: "none" | "flex";
  flex: { flexGrow: number };
}

export interface ContextTypes {
  checked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
