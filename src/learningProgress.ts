/** Pure, user-scoped overview of previously saved learning progress. */
export type CourseOverview={id:string;language:string;level:string;title:string};
export type ProgressOverviewRow={course_id:string;state:unknown;updated_at:string};
export type Overview={saved:number;completed:number;englishSaved:number;frenchSaved:number;
  lastCourseId:string|null;lastSavedAt:string|null};
function isObject(value:unknown):value is Record<string,unknown>{
 return Boolean(value&&typeof value==='object'&&!Array.isArray(value));
}
export function summarizeProgress(courses:CourseOverview[],rows:ProgressOverviewRow[]):Overview{
 const known=new Map(courses.map(c=>[c.id,c]));
 const unique=new Set<string>();
 let saved=0,completed=0,englishSaved=0,frenchSaved=0,lastCourseId:string|null=null;
 let lastSavedAt:string|null=null,lastTimestamp=-Infinity;
 for(const row of rows){
  if(!known.has(row.course_id)||unique.has(row.course_id))continue;
  unique.add(row.course_id);saved++;
  const course=known.get(row.course_id)!;
  if(course.language==='en')englishSaved++;
  else if(course.language==='fr')frenchSaved++;
  if(isObject(row.state)&&row.state.completed===true)completed++;
  const time=Date.parse(row.updated_at);
  if(Number.isFinite(time)&&time>lastTimestamp){
    lastTimestamp=time;lastSavedAt=row.updated_at;lastCourseId=row.course_id;
  }
 }
 return {saved,completed,englishSaved,frenchSaved,lastCourseId,lastSavedAt};
}
export function findLastCourse(courses:CourseOverview[],rows:ProgressOverviewRow[]):CourseOverview|null{
 const {lastCourseId}=summarizeProgress(courses,rows);
 return courses.find(c=>c.id===lastCourseId)??null;
}
