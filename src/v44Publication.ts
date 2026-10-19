import record from '../content/v44-draft-publication.json';
type Publication=Omit<typeof record,'public_preview'>&{public_preview:{status:string;owner_approval_reference:string|null}};
export const draftPublication:Publication=record;
// Gate the existing production build, not just the UI. Public PR source/history
// and review previews remain public; keeping this PR unmerged is also required.
export function assertDraftDeploymentAllowed(target:'preview'|'production',policy:Publication=draftPublication){
 if(target==='production'&&(policy.public_preview.status!=='approved'||!policy.public_preview.owner_approval_reference?.trim())){
  throw new Error('V4.4 production deployment blocked: 101 original drafts require explicit owner public-preview approval. Keep PR #50 unmerged.');
 }
}
