
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchCartItems = async () => {
    if (!user) {
      setCartItems([]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      setCartItems(data || []);
    } catch (error: any) {
      console.error('Error fetching cart items:', error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity: number = 1, packSize: string = '1 Piece') => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to add items to your cart",
        variant: "destructive",
      });
      return;
    }

    try {
      // Check if item already exists in cart
      const { data: existingItems, error: fetchError } = await supabase
        .from('cart_items')
        .select()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (fetchError) throw fetchError;

      if (existingItems && existingItems.length > 0) {
        // Update quantity if item exists
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItems[0].quantity + quantity })
          .eq('id', existingItems[0].id);

        if (error) throw error;
      } else {
        // Insert new item if it doesn't exist
        const { error } = await supabase
          .from('cart_items')
          .insert([
            {
              user_id: user.id,
              product_id: productId,
              quantity,
              pack_size: packSize
            }
          ]);

        if (error) throw error;
      }

      await fetchCartItems();
      toast({
        title: "Success",
        description: "Item added to cart",
      });
    } catch (error: any) {
      console.error('Error adding to cart:', error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId)
        .eq('user_id', user.id);

      if (error) throw error;

      await fetchCartItems();
      toast({
        title: "Success",
        description: "Item removed from cart",
      });
    } catch (error: any) {
      console.error('Error removing from cart:', error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId)
        .eq('user_id', user.id);

      if (error) throw error;

      await fetchCartItems();
    } catch (error: any) {
      console.error('Error updating quantity:', error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  return {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    fetchCartItems
  };
};
