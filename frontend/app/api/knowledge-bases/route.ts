import { NextResponse } from 'next/server';

const knowledgeBases = [
  {
    "id": 1,
    "title": "Australian Government Style Manual",
    "description": "Official style manual for Australian government writing and publishing",
    "category": "Government Resources",
    "engagement": 78,
    "featured": true,
    "image": "/style manual.png",
    "resources": [
      {
        "name": "Style Manual",
        "sources": "https://www.stylemanual.gov.au/"
      }
    ]
  },
  {
    "id": 2,
    "title": "Accessibility",
    "description": "Information on how to help people with disabilities",
    "category": "Social Services",
    "engagement": 65,
    "featured": true,
    "image": "/disability.png",
    "resources": [
      {
        "name": "Australia's Disability Strategy",
        "sources": "https://www.disabilitygateway.gov.au/ads/strategy"
      }
    ]
  },
  {
    "id": 3,
    "title": "Online resource/service list (NT)",
    "description": "Digital services and resources for the Northern Territory",
    "category": "Government Resources",
    "engagement": 42,
    "featured": false,
    "image": "/online resources.png",
    "resources": [
      {
        "name": "Digital Territory Showcase",
        "sources": "https://digitalterritory.nt.gov.au/showcase/digital-portals/territory-services"
      },
      {
        "name": "Motor Vehicle Registry",
        "sources": "https://mvr.nt.gov.au/"
      }
    ]
  },
  {
    "id": 4,
    "title": "Online resource/service list (Federal)",
    "description": "Federal government services and information resources",
    "category": "Government Resources",
    "engagement": 57,
    "featured": true,
    "image": "/online resources.png",
    "resources": [
      {
        "name": "List of enquire-lines",
        "sources": "https://www.directory.gov.au/enquiry-lines"
      },
      {
        "name": "Geographic diversity reports",
        "sources": "https://www.directory.gov.au/reports/geographic-diversity-reports"
      }
    ]
  },
  {
    "id": 5,
    "title": "Civic and Citizenship education (Democracy)",
    "description": "Collection of documents related to the Australian democracy",
    "category": "Education",
    "engagement": 71,
    "featured": true,
    "image": "/democracy report.png",
    "resources": [
      {
        "name": "Strengthening Australian Democracy",
        "sources": "https://www.homeaffairs.gov.au/about-us-subsite/files/strengthening-australian-democracy.pdf"
      },
      {
        "name": "Democracy Report",
        "sources": "https://www.apsreform.gov.au/sites/default/files/resource/download/Feb%202024%20-%20Democracy%20Report%20-%20with%20Alt%20text_0.pdf"
      },
      {
        "name": "Civic education and democratic perceptions",
        "sources": "https://www.apsreform.gov.au/sites/default/files/resource/download/Civic%20education%20and%20democratic%20perceptions%20-%20APSC%20template%20-%20Final.pdf"
      }
    ]
  },
  {
    "id": 6,
    "title": "Public discussion topic (Labor Market)",
    "description": "Statistical resources for labor market discussions",
    "category": "Public Information",
    "engagement": 63,
    "featured": false,
    "image": "/labour force.png",
    "resources": [
      {
        "name": "Labour Force, Australia",
        "sources": "https://www.abs.gov.au/statistics/labour/employment-and-unemployment/labour-force-australia/latest-release"
      },
      {
        "name": "Australian National Accounts: National Income, Expenditure and Product",
        "sources": "https://www.abs.gov.au/statistics/economy/national-accounts/australian-national-accounts-national-income-expenditure-and-product/latest-release"
      }
    ]
  }
];

export async function GET() {
  try {
    return NextResponse.json({ knowledge_base: knowledgeBases });
  } catch (error) {
    console.error('Error fetching knowledge bases:', error);
    return NextResponse.json({
      error: 'Error fetching knowledge bases',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}