import { readFileSync } from "fs";
import { join } from "path";
import HubClient from "./HubClient";

export default function HubPage() {
  const raw = readFileSync(join(process.cwd(), "hub_catalog.json"), "utf8");
  const catalog = JSON.parse(raw);
  return <HubClient catalog={catalog} />;
}
