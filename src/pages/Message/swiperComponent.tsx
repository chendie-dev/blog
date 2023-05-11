import React, { useEffect } from 'react'
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'; // 引入swiper的css
import './index.scss'
interface propType {
    index: number,
    carouselInfo: messageItemType[]
}
const SwiperComponent: React.FC<propType> = ({ index, carouselInfo }) => {
    const firstContainerSlidesPerView = 1.25; // 第一个swiper-container的slidesPerView
    let carouselSwiper: SwiperCore
    useEffect(() => {
        carouselSwiper?.autoplay.stop(); // 关闭自动切换
        setTimeout(() => {
            carouselSwiper?.autoplay.start(); // 开启自动切换
        }, 500)
    }, [])
    return (
        <div className="barrageInner">
            {
                carouselInfo?.length > 0 &&
                <Swiper
                    className="barrage"
                    slidesPerView={firstContainerSlidesPerView - index * 0.15}
                    speed={(Math.floor(Math.random()*(9-5+1))+5)*1000}
                    freeMode={true}
                    loop={true}
                    autoplay={{
                        delay: 0,
                    }}
                // onSwiper={swiper => { carouselSwiper = swiper; }}
                >
                    <SwiperSlide style={{height:100,width:100}}>
                        
                    </SwiperSlide>
                    {
                        carouselInfo?.map((item, index) => {
                            return (
                                <SwiperSlide className="barrageItem" key={index}>
                                    <div className="barrageText">{item.messageContent}</div>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            }
        </div>
    );

}
export default SwiperComponent

