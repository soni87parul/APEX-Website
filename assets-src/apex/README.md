# APEX Visual Asset Repository — Round 1

This is a **local asset repository ZIP**, not a published GitHub repository. Copy the selected files into the APEX website project (for example `public/images/apex/`). No existing production assets are overwritten.

## What is inside

- `01_authentic_clearmeat/`: four original ClearMeat-supplied photographs. These are the only supplied photos in this pack that document ClearMeat work.
- `02_generated_conceptual_hero/`: four wide photorealistic conceptual visuals for fermentation, plant-protein processing, cellular agriculture and events.
- `03_generated_editorial_thumbnails/`: sixteen smaller AI-generated visual concepts; they are moodboard-derived and **not full-resolution website photography**.
- `04_reference_moodboards/`: two full visual boards for art direction.
- `05_documents/asset_manifest.json`: provenance, placement, dimensions and publication caveats for each image.

## Suggested usage by section

| Website placement | First-choice asset | Rule |
| --- | --- | --- |
| Homepage hero | `01_authentic_clearmeat/IMG-20250921-WA0035.jpg` | Authentic ClearMeat research image |
| Cellular agriculture pathway | `01_authentic_clearmeat/IMG-20230220-WA0027.jpg` | Use authentic plate photograph; generated cell culture is secondary only |
| Fermentation pathway | `02_generated_conceptual_hero/fermentation_bioreactor_wide.jpg` | Clearly illustrative; no claims it is an APEX bioreactor |
| Plant-based pathway | `02_generated_conceptual_hero/plant_protein_processing_wide.jpg` | Clearly illustrative; no claims it is an APEX extruder |
| Research capabilities | `01_authentic_clearmeat/IMG-20250921-WA0021.jpg` | Use only once prominently; no repeated five-photo loop |
| Media / culture detail | `01_authentic_clearmeat/IMG-20240812-WA0008.jpg` | Real photo, limited resolution |
| Events hero / Next at APEX | Admin-uploaded approved event poster | The generated conference photo is a **temporary concept** only |
| Events photo gallery | Real photos uploaded after actual events | **Do not publish AI-generated people/events as actual APEX coverage** |

## Licensing and truthfulness

The AI-generated images were newly generated for this design exercise. They do not depict a real APEX facility, a real APEX event, or identifiable real APEX people. Label illustrative imagery where context could mislead. The ClearMeat-supplied images still need confirmation of permissions, especially for identifiable researchers.

Do not crop the editorial thumbnails beyond their existing resolution for large banners. Use the four wider conceptual images for initial layout mockups and replace with verified high-resolution authentic or licensed industry photography where available.

## Claude instructions

1. Inspect existing repo and image usage. Do not delete or overwrite the existing source images.
2. Import images under `public/images/apex/`, with descriptive file names.
3. Map all image references centrally in a typed content/config file.
4. Use responsive `picture`/`srcset` and `loading=lazy` for non-hero images; optimise to WebP/AVIF in build where feasible.
5. Set truthful alt text, e.g. `Illustrative bioreactor used to explain fermentation technology`, not `APEX fermentation facility`.
6. Do not use the AI-generated conference, networking or group photos as proof of past APEX events.
7. Make Events hero and secondary `Next at APEX` imagery independently editable in the admin CMS. Gallery remains real-event-only.
8. Obtain and prepare official ClearMeat logo from a supplied high-quality master. Do not reconstruct the logo from a screenshot. Prepare transparent dark-on-light and bright-on-dark versions only after the original logo is available.
9. MoFPI emblem is **not included**. Request an official file and confirm usage permission before publication. Describe MoFPI as institutional context, not the operator.
10. Show a before/after homepage and Events page visual checkpoint before committing major UI changes.

## Important gap

I could verify publicly listed Creative Commons source pages for bioreactor photographs, but external download access in this session did not allow me to package those original third-party image bytes. Therefore this ZIP does **not** claim to contain downloaded/licensed Wikimedia images. For an authentic third-party alternative, review:

- https://commons.wikimedia.org/wiki/File:Bioreactors.jpg — Luis Fernando Flores LAB, CC BY-SA 4.0
- https://commons.wikimedia.org/wiki/File:Bioreactor.jpg — Luis Fernando Flores LAB, CC BY-SA 4.0
- https://commons.wikimedia.org/wiki/File:Loading_bioreactor.jpg — USDA, CC BY 2.0 page (also public-domain notice; verify use)

Attribution and share-alike obligations may apply. The precise plant-protein extrusion image is still an outstanding real-photo acquisition.
