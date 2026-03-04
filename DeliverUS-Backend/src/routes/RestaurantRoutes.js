import OrderController from '../controllers/OrderController.js'
import ProductController from '../controllers/ProductController.js'
import RestaurantController from '../controllers/RestaurantController.js'
import { isLoggedIn, hasRole } from '../middlewares/AuthMiddleware.js'
import { checkRestaurantOwnership } from '../middlewares/RestaurantMiddleware.js'
import RestaurantValidation from '../controllers/validation/RestaurantValidation.js'
import { handleValidation } from '../middlewares/ValidationHandlingMiddleware.js'
import { handleFilesUpload } from '../middlewares/FileHandlerMiddleware.js'

const loadFileRoutes = function (app) {
  app.route('/restaurants')
    .get(
      RestaurantController.index)
    .post(
    // TODO: Add needed middlewares
      isLoggedIn,
      hasRole('owner'),
      handleFilesUpload(['image'], process.env.RESTAURANTS_FOLDER),
      RestaurantValidation.create,
      handleValidation,
      checkRestaurantOwnership,
      RestaurantController.create)

  app.route('/restaurants/:restaurantId')
    .get(
    // TODO: Add needed middlewares
      RestaurantController.show)
    .put(
    // TODO: Add needed middlewares
      isLoggedIn,
      hasRole('owner'),
      handleFilesUpload(['image'], process.env.RESTAURANTS_FOLDER),
      RestaurantValidation.update,
      handleValidation,
      checkRestaurantOwnership,
      RestaurantController.update)
    .delete(
    // TODO: Add needed middlewares
      isLoggedIn,
      hasRole('owner'),
      checkRestaurantOwnership,
      RestaurantController.destroy)

  app.route('/restaurants/:restaurantId/orders')
    .get(
    // TODO: Add needed middlewares
      isLoggedIn,
      hasRole('owner'),
      OrderController.indexRestaurant)

  app.route('/restaurants/:restaurantId/products')
    .get(
    // TODO: Add needed middlewares
      ProductController.indexRestaurant)

  app.route('/restaurants/:restaurantId/analytics')
    .get(
    // TODO: Add needed middlewares
      isLoggedIn,
      OrderController.analytics)
}
export default loadFileRoutes
