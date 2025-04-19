
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchWishlistItems = async () => {
    if (!user) {
      setWishlistItems([]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('wishlist_items')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      setWishlistItems(data || []);
    } catch (error: any) {
      console.error('Error fetching wishlist items:', error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addToWishlist = async (productId: number) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to add items to your wishlist",
        variant: "destructive",
      });
      return;
    }

    try {
      // Check if item already exists in wishlist
      const { data: existingItems, error: fetchError } = await supabase
        .from('wishlist_items')
        .select()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (fetchError) throw fetchError;

      if (existingItems && existingItems.length > 0) {
        toast({
          title: "Item already in wishlist",
          description: "This item is already in your wishlist",
        });
        return;
      }

      // Insert new item
      const { error } = await supabase
        .from('wishlist_items')
        .insert([
          {
            user_id: user.id,
            product_id: productId
          }
        ]);

      if (error) throw error;

      await fetchWishlistItems();
      toast({
        title: "Success",
        description: "Item added to wishlist",
      });
    } catch (error: any) {
      console.error('Error adding to wishlist:', error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const removeFromWishlist = async (itemId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('id', itemId)
        .eq('user_id', user.id);

      if (error) throw error;

      await fetchWishlistItems();
      toast({
        title: "Success",
        description: "Item removed from wishlist",
      });
    } catch (error: any) {
      console.error('Error removing from wishlist:', error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, [user]);

  return {
    wishlistItems,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    fetchWishlistItems
  };
};
