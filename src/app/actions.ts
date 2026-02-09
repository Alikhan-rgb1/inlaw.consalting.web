'use server';

import { supabaseAdmin } from "@/lib/supabase-admin";

export async function getSignedUrl(filePath: string) {
  try {
    const { data, error } = await supabaseAdmin
      .storage
      .from('client-documents')
      .createSignedUrl(filePath, 60 * 60); // 1 hour expiry

    if (error) {
      console.error("Error creating signed URL:", error);
      return { error: error.message };
    }

    return { url: data.signedUrl };
  } catch (err: any) {
    console.error("Server action error:", err);
    return { error: err.message };
  }
}

export async function updateDocumentStatus(docId: string, status: string) {
    try {
        const { error } = await supabaseAdmin
            .from('documents')
            .update({ status })
            .eq('id', docId);
        
        if (error) {
            console.error("Error updating status:", error);
            return { error: error.message };
        }

        return { success: true };
    } catch (err: any) {
        return { error: err.message };
    }
}
