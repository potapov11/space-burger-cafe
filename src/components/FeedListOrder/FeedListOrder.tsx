import React from 'react';
import FeedListOrderCss from './FeedListOrderCss.module.css';
import img from '../../images/ingredientImgs/bun-small.png';

const FeedListOrder = (): React.JSX.Element => {
	return (
		<li className={FeedListOrderCss.Item}>
			<div className={FeedListOrderCss.textDate}>
				<span className="text text_type_main-default">#034535</span>
				<span className="text text_type_main-default text_color_inactive">Сегодня, 16:20</span>
			</div>
			<div className={FeedListOrderCss.textName}>
				<p className="text text_type_main-default">Death Star Starship Main бургер</p>
			</div>
			<div className={FeedListOrderCss.ingredients}>
				<div className={FeedListOrderCss.imgsWrapper}>
					<div className={FeedListOrderCss.imgWrapper}>
						<img className={FeedListOrderCss.img} src="https://code.s3.yandex.net/react/code/bun-01.png" alt="" />
					</div>
					<div className={FeedListOrderCss.imgWrapper}>
						<img className={FeedListOrderCss.img} src="https://code.s3.yandex.net/react/code/bun-01.png" alt="" />
					</div>
					<div className={FeedListOrderCss.imgWrapper}>
						<img className={FeedListOrderCss.img} src="https://code.s3.yandex.net/react/code/bun-01.png" alt="" />
					</div>
					<div className={FeedListOrderCss.imgWrapper}>
						<img className={FeedListOrderCss.img} src="https://code.s3.yandex.net/react/code/bun-01.png" alt="" />
					</div>
					<div className={FeedListOrderCss.imgWrapper}>
						<img className={FeedListOrderCss.img} src="https://code.s3.yandex.net/react/code/bun-01.png" alt="" />
					</div>
					<div className={FeedListOrderCss.imgWrapper}>
						<img className={FeedListOrderCss.img} src="https://code.s3.yandex.net/react/code/bun-01.png" alt="" />
					</div>
					<div className={FeedListOrderCss.imgWrapper}>
						<img className={FeedListOrderCss.img} src="https://code.s3.yandex.net/react/code/bun-01.png" alt="" />
					</div>
					<div className={FeedListOrderCss.imgWrapper}>
						<img className={FeedListOrderCss.img} src="https://code.s3.yandex.net/react/code/bun-01.png" alt="" />
					</div>
				</div>
			</div>
		</li>
	);
};

export default FeedListOrder;
