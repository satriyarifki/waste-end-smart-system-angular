import {
  trigger,
  state,
  style,
  animate,
  transition,
  useAnimation,
} from '@angular/animations';
import {
  bounce,
  swing,
  slideInLeft,
  slideInDown,
  zoomIn,
  zoomOut,
  fadeInDown,
  fadeInUp,
  fadeOutUp,
} from 'ng-animate';

export const slideInRouteVar = trigger('routeAnimations', [
  transition('* => *', useAnimation(fadeInDown, { params: { timing: 0.25 } })),
  transition('* => *', useAnimation(fadeOutUp, { params: { timing: 0.25 } })),
]);

export const zoomInOutVar = trigger('ZoomInOutAnimation', [
  transition(':enter', useAnimation(fadeInDown, { params: { timing: 0.25 } })),
  transition(':leave', useAnimation(fadeOutUp, { params: { timing: 0.25 } })),
]);
export const zoomInVar = trigger('ZoomInAnimation', [
  transition(':enter', useAnimation(zoomIn, { params: { timing: 0.25 } })),
]);


// INSERT INTO `reports` (`product_name`, `product_code`, `neto`, `gross`, unit, `global_variable_1`,`global_variable_2`, `supplier_name`, `line_name`, `updated_at`) VALUES
// 	('Preform', '001', 

