export interface Citation {
  chapter: string
  page: number
  content: string
}

const mockTextbook = [
  {
    chapter: "Asthma",
    page: 1245,
    content: "Asthma is a common chronic inflammatory disease of the airways characterized by variable and recurring symptoms, reversible airflow obstruction, and easily triggered bronchospasms."
  },
  {
    chapter: "Neonatal Jaundice",
    page: 892,
    content: "Neonatal jaundice or neonatal hyperbilirubinemia is a yellowing of the skin and other tissues of a newborn infant. A bilirubin level of more than 85 μmol/l (5 mg/dL) manifests as clinical jaundice."
  }
]

export async function getRelevantChunks(query: string): Promise<Citation[]> {
  // Simple keyword matching for mock RAG
  const lowerQuery = query.toLowerCase()
  return mockTextbook.filter(chunk => 
    chunk.chapter.toLowerCase().includes(lowerQuery) || 
    chunk.content.toLowerCase().includes(lowerQuery)
  ).map(chunk => ({
    chapter: chunk.chapter,
    page: chunk.page,
    content: chunk.content
  }))
}
