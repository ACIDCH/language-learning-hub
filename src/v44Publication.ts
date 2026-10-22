import record from '../content/v44-draft-publication.json';
type Publication=Omit<typeof record,'public_preview'|'production_deployment'>&{
 public_preview:{status:string;owner_approval_reference:string|null};
 production_deployment:{status:string;owner_approval_reference:string|null};
};
export const draftPublication:Publication=record;
// Public preview and production deployment are separately authorized.
// Neither is equivalent to human teaching review or formal textbook publication.
// These checks do not make already-public GitHub sources confidential.
export function assertDraftDeploymentAllowed(target:'preview'|'production',policy:Publication=draftPublication){
 if(target!=='production')return;
 if(policy.public_preview.status!=='approved'||!policy.public_preview.owner_approval_reference?.trim()){
  throw new Error('V4.4 production deployment blocked: explicit owner public-preview approval and reference required.');
 }
 if(policy.production_deployment.status!=='approved'||!policy.production_deployment.owner_approval_reference?.trim()){
  throw new Error('V4.4 production deployment blocked: final owner deployment approval required after acceptance. Keep PR #50 unmerged and do not deploy.');
 }
}
