# Content claims register

Every factual claim on the site, where it appears, what supports it and whether it is approved. Open the preview with `?review` (for example `http://localhost:5173/?review`) to see every `requires-approval` element outlined in pink.

Status key: **Approved** (owner confirmed) · **Requires approval** (draft wording, page works either way) · **Remove if unconfirmed**.

| # | Claim | Where | Evidence / source | Approver | Status |
|---|---|---|---|---|---|
| 1 | APEX expands to "Alt Protein Excellence Hub" | Footer, structured data, logo | Official logo text. Earlier briefs say "Alternative Protein Excellence". | APEX | Requires approval |
| 2 | APEX is run and managed by ClearMeat | Hero band, ecosystem, footer, menu | README, project brief, logo strapline | ClearMeat | Requires approval (wording) |
| 3 | In partnership with NIFTEM-Kundli | Hero band, ecosystem, footer | README, logo strapline | ClearMeat + NIFTEM-Kundli | Requires approval (exact wording) |
| 4 | NIFTEM-Kundli is an institution under MoFPI | Hero band, ecosystem | Public fact; wording to confirm | APEX | Requires approval |
| 5 | APEX is not a government body and is not operated by MoFPI | Ecosystem | Brief guardrail | APEX | Requires approval |
| 6 | "India's integrated infrastructure platform for alternative proteins" | Hero | Positioning statement from brief | APEX | Requires approval |
| 7 | Pay-per-seat research access exists | Capabilities 01, audiences, inside/cellular | README services list | APEX | Requires approval (availability, terms not published) |
| 8 | Contract R&D "delivered by APEX scientists" | Capabilities 02 | Checkpoint 3 copy | APEX | Requires approval |
| 9 | Pilot support is pilot-scale, not commercial manufacturing | Foundation 04, capabilities 04, journey | Brief guardrail | APEX | Approved as a guardrail; keep |
| 10 | Pathway readiness labels (foundation / partner-supported / in development) for each of 6 modules × 3 pathways | Pathways foundation | Draft only, `src/content/pathways.ts` `uses` | APEX | Requires approval |
| 11 | Inside-the-platform status badges (e.g. "Scale-up: in development", "Pilot: partner-supported", "Texturisation: partner-supported") | Section 04 | Checkpoint 3 drafts, `src/content/platform.ts` | APEX | Requires approval |
| 12 | Journey stage statuses (Research and Develop: foundation; Validate and Pilot: partner; Scale readiness: in development) | Capabilities journey | Draft, `src/content/capabilities.ts` | APEX | Requires approval |
| 13 | "Built on ClearMeat's experience in cell culture and growth media" | Inside/cellular, ClearMeat role | ClearMeat background | ClearMeat | Requires approval |
| 14 | ClearX9 is ClearMeat's cell growth medium range (Stem, Neuro, standard) | ClearX9 inset | Product image labels | ClearMeat | Requires approval; any patent wording must be verified before use (currently not stated in copy) |
| 15 | Equipment "confirmed per project on enquiry" | Inside tabs | Deliberately non-specific | APEX | Requires approval |
| 16 | Regulatory guidance: APEX gives orientation on FSSAI novel-food requirements; approvals are issued by the authority | Foundation 05, capabilities 06, inside/regulatory, regulatory flow | Brief guardrail | APEX | Disclaimer approved as guardrail; scope requires approval |
| 17 | Introductions to regulatory specialists | Inside/regulatory, regulatory flow | Draft | APEX | Requires approval |
| 18 | Downstream processing / texturisation trials "with partners" | Inside/fermentation, inside/plant | Draft | APEX | Requires approval; name partners only with permission |
| 19 | Plant protein work uses Indian pulses, oilseeds and grains | Pathway 03 | Checkpoint 3 copy | APEX | Requires approval |
| 20 | Photo captions "ClearMeat research laboratory", "ClearMeat research" | Hero, pathway 01, inside | Client photos | ClearMeat | Requires approval; do not caption as "APEX facility" until confirmed |
| 21 | "© ClearMeat" in footer | Footer | Assumed operator | ClearMeat | Requires approval |
| 22 | Outbound links: clearmeat.org, niftem.ac.in, mofpi.gov.in | Ecosystem | `clearmeat.org` inferred from the `apex.clearmeat.org` domain | APEX | Requires approval (confirm ClearMeat URL) |

## Deliberately not claimed

No facility size or capacity, equipment list, client names, partner logos beyond ClearMeat and NIFTEM-Kundli, FSSAI or other approvals, certifications, government endorsement, commercial manufacturing, pricing, timelines or traction figures. Industry collaborators (Bühler, ProVeg, BRINC, BITS BioCyTiH, Nestlé per the README) are **not** shown until each relationship and logo permission is confirmed.
