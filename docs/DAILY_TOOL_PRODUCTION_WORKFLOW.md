# Daily Tool Production Workflow

## Daily batch size

Build five tools per batch. Use a batch ID in `YYMMDD-daily-NN` format and keep every selected backlog row tied to the same batch ID.

## Selection order

1. Read `资料/tool-backlog.csv` and keep rows whose status is `approved`.
2. Exclude slugs already present in `src/content/tools/` or `src/data/toolRegistry.ts`.
3. Sort by `priority_score` descending, then `monthly_search_volume` descending.
4. Before selection, reject or defer tools that lack a verifiable formula, source, version, or publishable data model.
5. Select the first five eligible rows and record the reason for any substitution.

## Production stages

1. **Source lock:** document formula, authoritative source, applicable version/year, assumptions, rounding, update owner, and whether the result is exact or estimated.
2. **Specification:** choose Formula, Converter, Multi-row, Versioned Lookup, or Custom Scaffold; define inputs, outputs, validation, exceptional states, and at least three test cases.
3. **Calculation core:** implement pure calculation functions independently from the page UI and verify published examples by hand.
4. **Interaction:** provide live calculation, a fixed result area, Calculate and Reset controls where appropriate, inline errors, initial/valid/invalid states, and a result comparison anchor.
5. **SEO and content:** create unique SEO title, meta description, H1, concise input-to-result subtitle, How to Use, use cases, limits, formula/source/version/assumptions/example, FAQ, and related internal links. Do not add a generic What Is section.
6. **Site integration:** register the component and application category, place the page in the correct homepage category, add verification status, and confirm sitemap inclusion.
7. **Quality gates:** run regression tests, production build, desktop browser examples, mobile-width checks, console-error checks, and basic accessibility checks.
8. **Closeout:** set the five backlog rows to `completed` only after all gates pass, then append one row per tool to `资料/tool-production-log.csv`.

## Definition of done

A tool is complete only when it satisfies `docs/CALCULATOR_PAGE_STANDARD.md`, its documented test cases pass, its source/version claims match the UI, the production build succeeds, browser QA passes, its sitemap URL exists, and both CSV logs are updated.
