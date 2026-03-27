import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "./useTheme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button onClick={toggle}>
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
}