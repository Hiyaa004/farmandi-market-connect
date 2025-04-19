
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchWishlistItems = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('wishlist_items')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      setWishlistItems(data || []);
    } catch (error: any) {
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
        title: "Error",
        description: "Please log in to add items to your wishlist",
        variant: "destructive",
      });
      return;
    }

    try {
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
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (user) {
      fetchWishlistItems();
    }
  }, [user]);

  return {
    wishlistItems,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    fetchWishlistItems
  };
};
