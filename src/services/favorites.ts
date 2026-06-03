import { supabase } from "@/lib/supabase/client";
import { FavoriteRow } from "@/types/favorite";

export async function addFavorite(user_id: string, product_id: number) {
    const { data, error } = await supabase
        .from('favourites')
        .insert({
            user_id: user_id,
            product_id: product_id
        })
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return (data ?? []).map((item: FavoriteRow) => item.product_id);
}

export async function deleteFavorite(user_id: string, product_id: number) {
    const { data, error } = await supabase
        .from('favourites')
        .delete()
        .eq('user_id', user_id)
        .eq('product_id', product_id)
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getFavorites(user_id: string): Promise<number[]> {
    const { data, error } = await supabase
        .from('favourites')
        .select('product_id')
        .eq('user_id', user_id)
        .order('id', { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return (data ?? []).map((item: FavoriteRow) => item.product_id);
}

export async function isFavourite(user_id: string, product_id: number) {
    const { data, error } = await supabase
        .from('favourites')
        .select('*')
        .eq('user_id', user_id)
        .eq('product_id', product_id)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}