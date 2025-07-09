import React from "react";
import { Download } from "lucide-react";

import acceptancePDF from '../assets/pdfs/Acceptance_of_self_and_partner_2.pdf';
import assertivePDF from '../assets/pdfs/assertive_communication.pdf';
import horsemenPDF from '../assets/pdfs/four_horsemen.pdf';
import dbtPDF from '../assets/pdfs/DBT_distress_tolerance_skills.pdf';

const resources = [
  { name: "Acceptance of Self and Partner", file: acceptancePDF },
  { name: "Assertive Communication", file: assertivePDF },
  { name: "Four Horsemen", file: horsemenPDF },
  { name: "DBT Distress Tolerance Skills", file: dbtPDF }
];

function Resources() {
  return (
    <div className="resources-page">
      {/* Top red bar */}
      <div className="full-width-section therapy-header-section">
        <h2>Resources</h2>
        <p className="therapy-header-desc">
          Download helpful therapy guides and worksheets instantly.
        </p>
      </div>

      {/* Download buttons */}
      <div className="resources-list">
        {resources.map((res, idx) => (
          <div key={idx} className="resource-item">
            <a
              href={res.file}
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
