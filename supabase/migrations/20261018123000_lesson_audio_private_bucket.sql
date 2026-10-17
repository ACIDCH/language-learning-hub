-- Private per-user lesson audio; 24 short original A1 practice tracks only.
-- No MP3 bytes are stored in Postgres or the PUBLIC GitHub repo.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('lesson-audio-private','lesson-audio-private',false,524288,
  array['audio/mpeg']::text[])
on conflict (id) do nothing;

drop policy if exists "lesson_audio_owner_read" on storage.objects;
create policy "lesson_audio_owner_read" on storage.objects
 for select to authenticated
 using (bucket_id = 'lesson-audio-private' and
   (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "lesson_audio_owner_insert" on storage.objects;
create policy "lesson_audio_owner_insert" on storage.objects
 for insert to authenticated
 with check (bucket_id = 'lesson-audio-private'
   and (storage.foldername(name))[1] = (select auth.uid())::text
   and storage.extension(name) = 'mp3'
   and exists (
     select 1 from public.course_audio_index a
     where a.source_kind='synthetic_practice'
       and a.asset_id || '.mp3' = storage.filename(name)
   ));

comment on column public.course_audio_index.audio_verified is
  'Human editorial/playback verification, not just byte existence or checksum match.';
