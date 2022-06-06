import express from 'express';
import { GetFoodAvailability, GetFoodsIn30Min, GetTopRestaurants, RestaurantID, SearchFoods } from '../controllers';

const router = express.Router();

// Food Availability
router.get('/:pincode', GetFoodAvailability)

// Top Restaurants
router.get('/top-restaurants/:pincode',GetTopRestaurants)

// Foods available in 30 minutes
router.get('/foods-in-30-min/:pincode', GetFoodsIn30Min)

// Search Food
router.get('/search/:pincode', SearchFoods)

// Find Restaurant By ID
router.get('/restaurant/:id', RestaurantID)


export { router as ShoppingRoute};