interface Faq {
    id: number
    question: string
    answer: string
  }
  
  export function useFaqData() {
    const faqs: Faq[] = [
      {
        id: 1,
        question: 'O que é o FeedBack Mz?',
        answer: 'O FeedBack Mz é o canal OFICIAL do consumidor , que atua como um canal independente de comunicação entre consumidores e empresas. Ao contrário do que muitos pensam, o FeedBack Mz não é apenas um site de reclamações, mas sim um site de pesquisa! Você sabia que mais de ⅔ dos nossos acessos são de consumidores que utilizam a plataforma para pesquisar a reputação de uma empresa antes de fazer uma compra?'
      },
      {
        id: 2,
        question: 'Como funciona o FeedBack Mz?',
        answer: 'O FeedBack Mz funciona como uma plataforma de intermediação entre consumidores e empresas. Os consumidores podem registrar suas reclamações, e as empresas têm a oportunidade de responder e resolver os problemas. A plataforma também oferece um sistema de avaliação que permite aos usuários classificar a qualidade do atendimento recebido.'
      }
    ]
  
    return {
      faqs
    }
  }