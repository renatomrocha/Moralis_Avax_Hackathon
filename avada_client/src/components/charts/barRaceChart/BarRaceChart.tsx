import React from 'react';
import './BarRaceChart.css';

function BarRaceChart() {

	return (
		<div className='barRaceChart'>
		<iframe id='iframeId' src='https://flo.uri.sh/visualisation/8380876/embed' title='Interactive or visual content' className='flourish-embed-iframe' frameBorder='0' scrolling='no' sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'></iframe>
		<div id='divId'>
			<a id='aId' className='flourish-credit' href='https://public.flourish.studio/visualisation/8380876/?utm_source=embed&utm_campaign=visualisation/8380876' target='_top'>
				<img alt='Made with Flourish' src='https://public.flourish.studio/resources/made_with_flourish.svg' /> 
			</a>
		</div>
		</div>

	)
}

export default BarRaceChart;
