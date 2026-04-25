# NectarSourceQuality

## Purpose
Evaluate whether a transcript, support file, or extracted nectar has enough density to deserve clone-level attention.

## Checks
- Specificity: concrete frameworks, named methods, examples, rules, or decisions.
- Signal density: useful insights per page or section.
- Coherence: clear argument, consistent terminology, low filler.
- Source fidelity: material appears to reflect the source rather than generic summarization.
- Operational value: can the clone use this to make better decisions?

## Score
- 0-5: unusable, noisy, empty, or generic.
- 6-12: weak, mostly archive value.
- 13-18: useful but needs pruning.
- 19-23: strong, likely useful.
- 24-25: excellent, rare, high-density source.

## Output
Return `source_quality_score`, top evidence, weak sections, and recommendation.

