import React, { useState } from "react";
import { Download, FileSearch2 } from "lucide-react";

const resources = [
  { name: "Acceptance of Self and Partner", file: "assets/pdfs/Acceptance_of_self_and_partner_2.pdf" },
  { name: "Assertive Communication", file: "assets/pdfs/assertive_communication.pdf" },
  { name: "Four Horsemen", file: "assets/pdfs/four_horsemen.pdf" },
  { name: "DBT Distress Tolerance Skills", file: "assets/pdfs/DBT_distress_tolerance_skills.pdf" },
  { name: "Soft Startups", file: "assets/pdfs/soft_startups.pdf" },
  { name: "Relationship Check-In", file: "assets/pdfs/relationship_check_in.pdf" },
  { name: "Letting Go of Resentment Worksheet", file: "assets/pdfs/letting_go_of_resentment_worksheet.pdf" },
  { name: "5aspectsprompts", file: "assets/pdfs/5aspectsprompts.pdf" }, 
  { name: "actworksheet", file: "assets/pdfs/actworksheet.pdf" },
  { name: "bipolarmoodmanagement", file: "assets/pdfs/bipolarmoodmanagement.pdf" },
  { name: "CBT&DBT", file: "assets/pdfs/CBT&DBT.jpg" },
  { name: "commitmentlife", file: "assets/pdfs/commitmentlife.pdf" },
  { name: "crisismanagementplan", file: "assets/pdfs/crisismanagementplan.pdf" },
  { name: "criticalvoicetrs", file: "assets/pdfs/criticalvoicetrs.pdf" },
  { name: "decatastrophizing", file: "assets/pdfs/decatastrophizing.pdf" },
  { name: "DelayDistractDecide", file: "assets/pdfs/DelayDistractDecide.pdf" },
  { name: "emdrprompt", file: "assets/pdfs/emdrprompt.pdf" },
  { name: "face", file: "assets/pdfs/face.pdf" },
  { name: "findingmeaning", file: "assets/pdfs/findingmeaning.pdf" },
  { name: "healthybalance", file: "assets/pdfs/healthybalance.pdf" },
  { name: "imposter-syndrome", file: "assets/pdfs/imposter-syndrome.pdf" },
  { name: "mooddiary", file: "assets/pdfs/mooddiary.pdf" },
  { name: "paindiary", file: "assets/pdfs/paindiary.pdf" },
  { name: "perfectionismtrs", file: "assets/pdfs/perfectionismtrs.pdf" },
  { name: "PositiveStatements", file: "assets/pdfs/PositiveStatements.pdf" },
  { name: "problemgoalframework", file: "assets/pdfs/problemgoalframework.pdf" },
  { name: "ProblemSolving", file: "assets/pdfs/ProblemSolving.pdf" },
  { name: "ptsdthoughtrecordsheet", file: "assets/pdfs/ptsdthoughtrecordsheet.pdf" },
  { name: "rain-mindfulness-technique", file: "assets/pdfs/rain-mindfulness-technique.pdf" },
  { name: "relapseprevention", file: "assets/pdfs/relapseprevention.pdf" },
  { name: "relationship-letter", file: "assets/pdfs/relationship-letter.pdf" },
  { name: "safetyplan", file: "assets/pdfs/safetyplan.pdf" },
  { name: "Self-Compassion", file: "assets/pdfs/Self-Compassion.pdf" },
  { name: "THINK_CBT_-_EXERCISE_6_THINK_CBT_JUNCTION_MODEL_V10", file: "assets/pdfs/THINK_CBT_-_EXERCISE_6_THINK_CBT_JUNCTION_MODEL_V10.pdf" },
  { name: "THINK_CBT_-_EXERCISE_29_-_PACE_ACTIVITY_V10", file: "assets/pdfs/THINK_CBT_-_EXERCISE_29_-_PACE_ACTIVITY_V10.pdf" },
  { name: "THINK_CBT_EXERCISE_8_-_LONGITUDINAL_FORMULATION_V10", file: "assets/pdfs/THINK_CBT_EXERCISE_8_-_LONGITUDINAL_FORMULATION_V10.pdf" },
  { name: "THINK_CBT_EXERCISE_9_-_LAYERS_OF_COGNITION_V10", file: "assets/pdfs/THINK_CBT_EXERCISE_9_-_LAYERS_OF_COGNITION_V10.pdf" },
  { name: "THINK_CBT_EXERCISE_14_-_CBT_CONTINUUM_V10", file: "assets/pdfs/THINK_CBT_EXERCISE_14_-_CBT_CONTINUUM_V10.pdf" },
  { name: "THINK_CBT_EXERCISE_16_-_CBT_RESPONSIBILITY_PIE_CHART_V10", file: "assets/pdfs/THINK_CBT_EXERCISE_16_-_CBT_RESPONSIBILITY_PIE_CHART_V10.pdf" },
  { name: "THINK_CBT_EXERCISE_20_-_THE_CHARACTERISATION_GAME_V10", file: "assets/pdfs/THINK_CBT_EXERCISE_20_-_THE_CHARACTERISATION_GAME_V10.pdf" },
  { name: "treatmentplan", file: "assets/pdfs/treatmentplan.pdf" },
  { name: "what-is-mindfulness", file: "assets/pdfs/what-is-mindfulness.pdf" },
  { name: "body-image-info-sheet", file: "assets/pdfs/body-image-info-sheet.pdf" },
  { name: "Negotiating as if Your Life Depended on It (2017)", file: "assets/pdfs/Negotiating as if Your Life Depended on It (2017).epub" },
  { name: "coping-skills-addictions", file: "assets/pdfs/coping-skills-addictions.pdf" },
  { name: "DBT-cheat-sheet", file: "assets/pdfs/DBT-cheat-sheet.pdf" },
  { name: "dbt-distress-tolerance-skills", file: "assets/pdfs/dbt-distress-tolerance-skills.pdf" },
  { name: "DBTCHEATSHEAT", file: "assets/pdfs/DBTCHEATSHEAT.jpg" },
  { name: "DBTMindfulness", file: "/assets/pdfs/DBTMindfulness.pdf" },
  { name: "Distress Tolerance DBT Skills", file: "/assets/pdfs/Distress Tolerance DBT Skills.pdf" },
  { name: "DistressTolerance", file: "/assets/pdfs/DistressTolerance.jpg" },
  { name: "Emotion Regulation DBT Skills-33", file: "/assets/pdfs/Emotion Regulation DBT Skills-33.jpg" },
  { name: "Emotion Regulation DBT Skills-34", file: "/assets/pdfs/Emotion Regulation DBT Skills-34.jpg" },
  { name: "Emotion Regulation DBT Skills-35", file: "/assets/pdfs/Emotion Regulation DBT Skills-35.jpg" },
  { name: "Emotion Regulation DBT Skills-36", file: "/assets/pdfs/Emotion Regulation DBT Skills-36.jpg" },
  { name: "Emotion Regulation DBT Skills", file: "/assets/pdfs/Emotion Regulation DBT Skills.pdf" },
  { name: "Emotion.", file: "/assets/pdfs/Emotion..pdf" },
  { name: "emotional-regulation_abc-please_accumulate", file: "/assets/pdfs/emotional-regulation_abc-please_accumulate.pdf" },
  { name: "emotional-regulation_abc-please_build-mastery", file: "/assets/pdfs/emotional-regulation_abc-please_build-mastery.pdf" },
  { name: "emotional-regulation_opposite-action", file: "/assets/pdfs/emotional-regulation_opposite-action.pdf" },
  { name: "emotional-regulation_positive-self-talk", file: "/assets/pdfs/emotional-regulation_positive-self-talk.pdf" },
  { name: "emotional-regulation_stop", file: "/assets/pdfs/emotional-regulation_stop.pdf" },
  { name: "EmotionalManagement", file: "/assets/pdfs/EmotionalManagement.jpg" },
  { name: "EmotionalWheel", file: "/assets/pdfs/EmotionalWheel.pdf" },
  { name: "ENVY", file: "/assets/pdfs/ENVY.jpg" },
  { name: "ImprovingRelationshipMechanics", file: "/assets/pdfs/ImprovingRelationshipMechanics.jpg" },
  { name: "Interpersonal Effectiveness DBT Skills", file: "/assets/pdfs/Interpersonal Effectiveness DBT Skills.pdf" },
  { name: "interpersonal-effectiveness_dear-man", file: "/assets/pdfs/interpersonal-effectiveness_dear-man.pdf" },
  { name: "Intrusive", file: "/assets/pdfs/Intrusive.jpg" },
  { name: "LettingGoofEmotionalSuffering", file: "/assets/pdfs/LettingGoofEmotionalSuffering.pdf" },
  { name: "Mindfulness DBT Skills", file: "/assets/pdfs/Mindfulness DBT Skills.pdf" },
  { name: "Mindfulness", file: "/assets/pdfs/Mindfulness.pdf" },
  { name: "Modifying Rules and Assumptions (1)", file: "/assets/pdfs/Modifying Rules and Assumptions (1).pdf" },
  { name: "NightmaresAndSuffering", file: "/assets/pdfs/NightmaresAndSuffering.pdf" },
  { name: "ObservingEmotion", file: "/assets/pdfs/ObservingEmotion.pdf" },
  { name: "OCDThoughtRecordSheet", file: "/assets/pdfs/OCDThoughtRecordSheet.pdf" },
  { name: "OppositeAction", file: "/assets/pdfs/OppositeAction.pdf" },
  { name: "POSITIVE EMOTIONS", file: "/assets/pdfs/POSITIVE EMOTIONS.jpg" },
  { name: "SelfEsteem", file: "/assets/pdfs/SelfEsteem.jpg" },
  { name: "ShameVsGuilt", file: "/assets/pdfs/ShameVsGuilt.jpg" },
  { name: "thought-defusion-techniques", file: "/assets/pdfs/thought-defusion-techniques.pdf" },
  { name: "tipp", file: "/assets/pdfs/tipp.jpg" },
  { name: "TroubleshootingEMotions", file: "/assets/pdfs/TroubleshootingEMotions.pdf" },
  { name: "Validation-Invalidation", file: "/assets/pdfs/Validation-Invalidation.pdf" },
  { name: "Values and Priorities", file: "/assets/pdfs/Values and Priorities.pdf" },
  { name: "Values2", file: "/assets/pdfs/Values2.pdf" }

];


function Resources() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setFadeIn(false); // Reset fade before showing new results
    const filtered = resources.filter(res =>
      res.name.toLowerCase().includes(query.trim().toLowerCase())
    );
    setResults(filtered);
    setTimeout(() => setFadeIn(true), 10); // Trigger fade after DOM update
  };

  const displayList = query === "" ? [] : results;

  return (
    <div className="resources-page">
      <div className="full-width-section therapy-header-section">
        <h2>Resources</h2>
        <p>Download helpful therapy guides and worksheets instantly.</p>
      </div>
      
      <form
        onSubmit={handleSearch}
        className="resources-search-form"
        style={{ display: "flex", justifyContent: "center", gap: "12px", margin: "24px 0" }}
      >
        <input
          type="text"
          placeholder="Search for a resource..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ padding: "10px", width: "250px" }}
        />
        <button type="submit" className="resource-search-btn">
          <FileSearch2 size={25} />
        </button>
      </form>
      
      <div className={`resources-list${fadeIn && displayList.length > 0 ? " visible" : ""}`}>
        {displayList.length === 0 && query !== "" && (
          <div>No resources found.</div>
        )}
        {displayList.map((res, idx) => (
          <div key={idx} className="resource-item">
            <a
              href={`${process.env.PUBLIC_URL}/${res.file}`}
              download
              className="resource-download"
            >
              <Download size={20} />
            </a>
            <span className="resource-title">{res.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resources;