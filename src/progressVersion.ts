/** A version marker must strictly advance even when the browser clock has
 * not moved beyond the last server timestamp. Protects consecutive CAS saves
 * from reusing the same millisecond-valued version.
 */
export function nextProgressTimestamp(previous:string|null,now=Date.now()):string{
 const preceding=previous?Date.parse(previous):Number.NaN;
 return new Date(Math.max(now,Number.isFinite(preceding)?preceding+1:now)).toISOString();
}
