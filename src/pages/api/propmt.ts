
export const NumberOfQuestion:number=5
export const createQuestions=(jobRole:string , jobDescription:string)=>
     `Generate ${NumberOfQuestion} interview questions in json format for the job role: "${jobRole} and job description ${jobDescription} ignore job jobDescription if it is irrelavent"`;

