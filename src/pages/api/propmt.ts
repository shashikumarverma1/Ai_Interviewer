
export const NumberOfQuestion:number=6
export const createQuestions=(jobRole:string , jobDescription:string)=>
    
     `search top 200 interview questions or question based on daily use give ${NumberOfQuestion} question in json format for the job role: "${jobRole} and job description ${jobDescription} ignore job jobDescription if it is irrelavent"`;

