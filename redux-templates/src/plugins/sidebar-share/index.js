const { registerPlugin } = wp.plugins;
import Sidebar from './sidebar'

const redux_templatesIcon = <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 19 19">
<g>
	<path d="M10.9,17.7H7.4l-0.9-1.5l2.1-2.4L10.9,17.7L10.9,17.7z M5.6,16.1l-1.5,1.6H0.1L4,13.3L5.6,16.1L5.6,16.1z"/>
	<polygon points="6.1,15.6 0.4,5.9 3.9,5.9 6.6,10.4 14.6,1.3 18.9,1.3 6.1,15.6 	"/>
</g>
</svg>

registerPlugin( 'redux-templates-share', {
	icon: redux_templatesIcon,
	render: Sidebar,
} );
