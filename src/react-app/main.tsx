import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AliasProvider } from "./context/AliasContext";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AliasProvider>
			<App />
		</AliasProvider>
	</StrictMode>,
);
