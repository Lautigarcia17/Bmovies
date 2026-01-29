# Avatar Upload Implementation Guide

## Current Implementation

The profile settings page now includes an avatar upload feature with the following characteristics:

### Features Implemented
- ✅ Click camera icon to upload PNG or JPG images
- ✅ 2MB file size limit
- ✅ Real-time preview before saving
- ✅ Remove avatar option
- ✅ Default avatar shows first letter of username
- ✅ Username validation on blur (not while typing)
- ✅ Save button disabled until username is validated

### Current Behavior
Currently, the avatar preview uses a **base64 data URL** for display. This is a simplified implementation suitable for:
- Development and testing
- Small images (under 2MB)
- Immediate visual feedback

## Production Implementation with Supabase Storage

For production use, you should integrate with Supabase Storage. Here's how:

### 1. Create a Storage Bucket

In your Supabase dashboard:
```sql
-- Create a public bucket for avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);
```

### 2. Set up Storage Policies

```sql
-- Allow authenticated users to upload their own avatars
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow anyone to view avatars
CREATE POLICY "Anyone can view avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- Allow users to update their own avatar
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own avatar
CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

### 3. Update the Upload Function

Replace the `handleSubmit` function in `ProfileSettingsPage.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSaving(true);
  setSaveSuccess(false);
  setSaveError(null);

  try {
    const updateData: any = {};

    // Only include username if it changed and is available
    if (formData.username !== ownProfile?.username) {
      if (!usernameStatus.available) {
        setSaveError('Please choose an available username');
        setSaving(false);
        return;
      }
      updateData.username = formData.username;
    }

    // Handle avatar upload to Supabase Storage
    if (avatarFile && ownProfile) {
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${ownProfile.id}/${Date.now()}.${fileExt}`;
      
      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, avatarFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw new Error('Failed to upload avatar');
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      updateData.avatar_url = urlData.publicUrl;

      // Delete old avatar if exists
      if (ownProfile.avatar_url) {
        const oldPath = ownProfile.avatar_url.split('/avatars/')[1];
        if (oldPath) {
          await supabase.storage.from('avatars').remove([oldPath]);
        }
      }
    } else if (avatarPreview === '' && formData.avatar_url !== '') {
      // User removed the avatar
      if (ownProfile?.avatar_url) {
        const oldPath = ownProfile.avatar_url.split('/avatars/')[1];
        if (oldPath) {
          await supabase.storage.from('avatars').remove([oldPath]);
        }
      }
      updateData.avatar_url = null;
    }

    await updateOwnProfile(updateData);
    setSaveSuccess(true);
    
    setTimeout(() => {
      navigate('/profile');
    }, 2000);
  } catch (err: any) {
    setSaveError(err.message || 'Failed to update profile');
  } finally {
    setSaving(false);
  }
};
```

### 4. Import Supabase Client

Add to the imports in `ProfileSettingsPage.tsx`:

```typescript
import { supabase } from '../../supabase/client';
```

## Benefits of Supabase Storage Integration

- ✅ Images stored efficiently in CDN
- ✅ Automatic scaling and optimization
- ✅ Better performance (no base64 bloat in database)
- ✅ Proper file management and deletion
- ✅ Row Level Security for access control

## Notes

- The current implementation works for development
- File validation (type, size) is already implemented
- UI for upload/remove is fully functional
- Only the storage backend needs to be swapped
