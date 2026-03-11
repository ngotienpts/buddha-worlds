document.addEventListener("DOMContentLoaded", function () {
    // Tập hợp tất cả các phần tử cần sử dụng
    const backTop = document.querySelector("#back-top");

    // xử lý sự kiện chuyển tab
    function handleChangeTab() {
        const changTabs = document.querySelectorAll('.js__changeTab');

        if (changTabs.length === 0) return;

        changTabs.forEach((changTab) => {
            const tabs = changTab.querySelectorAll(".js__tabItem");
            const panes = changTab.querySelectorAll(".js__tabPane");
            const fastReadBtn = changTab.querySelector(".js__fastRead");
            const arrangeContainer = changTab.querySelector(".js__arrangeContainer");
            const getTextContent = changTab.querySelector(".js__getTextContent");

            // Hàm hỗ trợ để cập nhật Layout cho Pane đang hiển thị
            function updatePaneLayout(activePane) {
                if (!arrangeContainer || !activePane) return;

                const isFull = arrangeContainer.querySelector('.js__arrangeFull.active');
                const fullContent = activePane.querySelector(".js__tabPaneChildrenFull");
                const shrinkContent = activePane.querySelector(".js__tabPaneChildrenShrink");

                if (isFull) {
                    fullContent?.classList.add('active');
                    shrinkContent?.classList.remove('active');
                } else {
                    fullContent?.classList.remove('active');
                    shrinkContent?.classList.add('active');
                }
            }

            // 1. Xử lý chuyển Tab
            tabs.forEach((tab, index) => {
                tab.onclick = function() {
                    if (this.classList.contains('active')) return;

                    const pane = panes[index];
                    if (!pane) return;

                    changTab.querySelector('.js__tabItem.active')?.classList.remove('active');
                    changTab.querySelector('.js__tabPane.active')?.classList.remove('active');

                    this.classList.add('active');
                    pane.classList.add('active');

                    // QUAN TRỌNG: Cập nhật layout cho Pane mới dựa trên nút đang active
                    updatePaneLayout(pane);
                }
            });

            // 2. Xử lý các nút Arrange (Full/Shrink)
            if (arrangeContainer) {
                const arrangeFull = arrangeContainer.querySelector('.js__arrangeFull');
                const arrangeShrink = arrangeContainer.querySelector('.js__arrangeShrink');

                if (arrangeFull) {
                    arrangeFull.onclick = function() {
                        this.classList.add('active');
                        arrangeShrink?.classList.remove('active');
                        
                        // Cập nhật ngay lập tức cho pane đang mở
                        const activePane = changTab.querySelector('.js__tabPane.active');
                        updatePaneLayout(activePane);
                    }
                }

                if (arrangeShrink) {
                    arrangeShrink.onclick = function() {
                        this.classList.add('active');
                        arrangeFull?.classList.remove('active');

                        const activePane = changTab.querySelector('.js__tabPane.active');
                        updatePaneLayout(activePane);
                    }
                }
            }
            // 3. Xử lý show hidden tab on mobile
            if (getTextContent) {
                const setText = getTextContent.querySelector('.js__setText');

                getTextContent.onclick = function() {
                    getTextContent.classList.toggle('active');
                    if (setText) {
                        const activeTab = changTab.querySelector('.js__tabItem.active');
                        setText.innerText = activeTab.innerText
                    }
                }
            }

            if (fastReadBtn) {
                fastReadBtn.onclick = () => tabs[0]?.click();
            }
        });
    }

    // xử lý sự kiện hiện popup detail pagoda
    function handlePopupDetailPagoda() {
        const popupContainer = document.querySelector(".js__popupDetailPagodaContainer");
        if (!popupContainer) return;

        const closePopup = popupContainer.querySelector(".js__closePopupDetailPagoda");
        const overlay = popupContainer.querySelector(".js__overlay");

        // 1. Lắng nghe click trên toàn bộ document (Event Delegation)
        document.addEventListener('click', function (e) {
            // Kiểm tra nếu click trúng phần tử có class hoặc nằm trong phần tử có class js__showPopupDetailPagoda
            const target = e.target.closest('.js__showPopupDetailPagoda');
            
            if (target) {
                popupContainer.classList.add('active');
                if (overlay) overlay.classList.add('active');
            }
        });

        // 2. Hàm đóng popup
        const closeFullPopup = () => {
            popupContainer.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
        };

        if (closePopup) closePopup.onclick = closeFullPopup;
        if (overlay) overlay.onclick = closeFullPopup;
    }

    // xử lý sự kiện hiên popup feedback
    function handlePopupFeedbackPagoda() {
        const triggerButtons = document.querySelectorAll('.js__showPopupFeedbackPagoda');
        const popupContainer = document.querySelector(".js__popupFeedbackPagodaContainer");

        // Nếu không có nút bấm hoặc không có container thì thoát sớm
        if (triggerButtons.length === 0 || !popupContainer) return;

        // Tìm các thành phần bên trong popup một lần duy nhất
        const closePopup = popupContainer.querySelector(".js__closePopupFeedbackPagoda");
        const overlay = popupContainer.querySelector(".js__overlay");

        // Hàm đóng popup dùng chung
        const closeFullPopup = () => {
            popupContainer.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
        };

        // Gán sự kiện mở cho tất cả các nút
        triggerButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                popupContainer.classList.add('active');
                if (overlay) overlay.classList.add('active');
            });
        });

        // Gán sự kiện đóng
        if (closePopup) closePopup.addEventListener('click', closeFullPopup);
        if (overlay) overlay.addEventListener('click', closeFullPopup);
    }


    // Xử lý video tỉ lệ 16:9
     function handleVideo_16x9() {
        const video169s = document.querySelectorAll(".js__video169");
        if (video169s.length === 0) return;
        video169s.forEach((video169) => {
            var videos = video169.querySelectorAll("iframe");
            if (videos.length === 0) return;
            videos.forEach((video) => {
                var w = video.offsetWidth;
                video.style.height = (w * 9) / 16 + "px";
            });
        });
    }

    // xử lý ẩn hiện full nội dung
    function handleShowFullContent() {
        const fullContents = document.querySelectorAll(".js__extendContainer");
        if (fullContents.length === 0) return;
        fullContents.forEach((fullContent) => {
            var btn = fullContent.querySelector(".js__extendBtn");
            if (!btn) return;

            btn.onclick = function() {
                fullContent.classList.toggle('full')
                if (fullContent.classList.contains('full')) {
                    this.innerText = 'Thu gọn';
                } else {
                    this.innerText = 'Xem thêm';
                }
            }
            
        });
    }

    // xử lý sự kiện collapse
    function handleCollapse () {

        const collapseContainers = document.querySelectorAll('.js__collapseContainer')
        if (collapseContainers.length === 0) return;
        
        collapseContainers.forEach((collapseContainer)=>{
            const collapses = collapseContainer.querySelector('.js__collapse')
            collapses.onclick = function() {
                collapseContainer.classList.toggle('active'); 
            }
           
        })
    }

   
    // xử lý sự kiện để show dropdown
     function handleShowDropdown() {
        
        const dropdownContainers = document.querySelectorAll(".js__dropdownContainer");


        if (dropdownContainers.length === 0) return;


        dropdownContainers.forEach((dropdownContainer)=>{

            const dropdown = dropdownContainer.querySelector(".js__showDropdown");
            const dropdownContent = dropdownContainer.querySelector(".js__dropdownContent");
            const overlay = dropdownContainer.querySelector(".js__overlay");


            dropdown.onclick = function () {
                dropdownContent.classList.toggle("active");
                overlay.classList.add('active')

            };

            overlay.onclick = function () {
                dropdownContent.classList.remove("active");
                this.classList.remove("active");
            };
        })

      
    }

    // xử lý sự kiện show hidden menu digital library
    function handleShowHiddenDigitalLibrary() {
        const menuDigitalContainers = document.querySelectorAll(".js__showHiddenMenuDigitalContainer");
        const mainElement = document.querySelector("main")

        if (menuDigitalContainers.length === 0) return;

        // Hàm phụ trợ để xử lý việc khóa/mở cuộn trang và style cho main
        const toggleLayoutState = (isActive) => {
            // Xử lý Body Scroll
            if (window.innerWidth <= 992) {
                document.body.style.overflow = isActive ? "hidden" : "";
            } else {
                document.body.style.overflow = "";
            }

            // Xử lý style cho Main
            if (mainElement) {
                if (isActive) {
                    mainElement.style.position = "relative";
                    mainElement.style.zIndex = "10000";
                } else {
                    // Chỉ xóa style nếu không còn container nào khác đang active
                    const anyActive = Array.from(menuDigitalContainers).some(el => el.classList.contains("active"));
                    if (!anyActive) {
                        mainElement.style.position = "";
                        mainElement.style.zIndex = "";
                    }
                }
            }
        };

        menuDigitalContainers.forEach((menuDigitalContainer) => {
            const showMenuDigital = menuDigitalContainer.querySelector(".js__buttonShowHiddenMenu");
            const closeMenuDigital = menuDigitalContainer.querySelector(".js__closeMenuDigital");
            const overlay = menuDigitalContainer.querySelector(".js__overlay");

            if (showMenuDigital) {
                showMenuDigital.onclick = function () {
                    menuDigitalContainer.classList.toggle("active");
                    const isActive = menuDigitalContainer.classList.contains("active");
                    
                    if (overlay) {
                        overlay.classList.toggle('active', isActive);
                    }
                    
                    toggleLayoutState(isActive);
                };
            }

            const closeAll = () => {
                menuDigitalContainer.classList.remove("active");
                if (overlay) overlay.classList.remove("active");
                toggleLayoutState(false);
            };

            if (closeMenuDigital) closeMenuDigital.onclick = closeAll;
            if (overlay) overlay.onclick = closeAll;
        });

        // Lắng nghe sự kiện resize
        window.addEventListener('resize', () => {
            const anyActive = Array.from(menuDigitalContainers).some(el => el.classList.contains("active"));
            toggleLayoutState(anyActive);
        });
    }

    // xử lý sự kiện play audio
    function handleAudio() {
        const audioContainers = document.querySelectorAll(".js__audioContainer");

        if (audioContainers.length === 0) return;

        audioContainers.forEach((audioContainer)=>{

            const audio = audioContainer.querySelector('.js__audioSource');
            const playPauseBtn = audioContainer.querySelector('.js__audioPlay');
            const seekSlider = audioContainer.querySelector('.js__audioRange');
            const controlIcon = audioContainer.querySelector('.js__controlIcon');
    
            // Paths cho Icon SVG
            const iconPaths = {
                play: {
                d: "M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z",
                viewBox: "0 0 384 512"
                },
                pause: {
                d: "M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z",
                viewBox: "0 0 320 512"
                }
            };
    
            // Hàm cập nhật giao diện thanh kéo
            const updateUI = () => {
                const percentage = (audio.currentTime / audio.duration) * 100 || 0;
                seekSlider.value = percentage;
                seekSlider.style.backgroundSize = `${percentage}% 100%`;
            };
    
            // Hàm đổi Icon
            const toggleIcon = (type) => {
                controlIcon.setAttribute('viewBox', iconPaths[type].viewBox);
                controlIcon.querySelector('path').setAttribute('d', iconPaths[type].d);
            };
    
            // 1. Sự kiện Play/Pause
            playPauseBtn.addEventListener('click', () => {
                if (audio.paused) {
                audio.play();
                toggleIcon('pause');
                } else {
                audio.pause();
                toggleIcon('play');
                }
            });
    
            // 2. Cập nhật thanh range khi nhạc đang phát
            audio.addEventListener('timeupdate', updateUI);
    
            // 3. Khi người dùng kéo thanh range (tua nhạc)
            seekSlider.addEventListener('input', (e) => {
                const seekTo = (e.target.value / 100) * audio.duration;
                audio.currentTime = seekTo;
                updateUI(); // Cập nhật màu sắc ngay lập tức khi kéo
            });
    
            // 4. Xử lý khi nhạc kết thúc
            audio.addEventListener('ended', () => {
                toggleIcon('play');
                seekSlider.value = 100;
                seekSlider.style.backgroundSize = `100% 100%`;
            });
        })

    }

    // xử lý sự kiện click add active cho pagodaPrimaryContainer
    function handlePagodaPrimary() {
        const controlBtn = document.querySelector('.js__controlPagoda');
        const container = document.querySelector('.js__pagodaContainer');
        
        // Kiểm tra nếu không tìm thấy element thì thoát hàm để tránh lỗi
        if (!controlBtn || !container) return;

        const iconWrapper = controlBtn.querySelector('.control-icon');
        const textLabel = controlBtn.querySelector('.control-text');

        // Lưu trữ mã SVG vào biến để code trông sạch sẽ hơn
        const listIcon = `<svg fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 80C0 71.16 7.164 64 16 64H432C440.8 64 448 71.16 448 80C448 88.84 440.8 96 432 96H16C7.164 96 0 88.84 0 80zM0 240C0 231.2 7.164 224 16 224H432C440.8 224 448 240 448 240C448 248.8 440.8 256 432 256H16C7.164 256 0 248.8 0 240zM432 416H16C7.164 416 0 408.8 0 400C0 391.2 7.164 384 16 384H432C440.8 384 448 391.2 448 400C448 408.8 432 416 432 416z"></path></svg>`;
        const mapIcon = `<svg fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M264 112C264 98.75 274.7 88 288 88C301.3 88 312 98.75 312 112C312 125.3 301.3 136 288 136C274.7 136 264 125.3 264 112zM273.2 311.1C241.1 271.9 168 174.6 168 120C168 53.73 221.7 0 288 0C354.3 0 408 53.73 408 120C408 174.6 334.9 271.9 302.8 311.1C295.1 321.6 280.9 321.6 273.2 311.1V311.1zM366.6 154.1C373.3 139 376 127.4 376 120C376 71.4 336.6 32 288 32C239.4 32 200 71.4 200 120C200 127.4 202.7 139 209.4 154.1C215.9 170.4 225.1 187.4 235.8 204.7C252.9 232.5 272.7 259.4 288 279.1C303.3 259.4 323.1 232.5 340.2 204.7C350.9 187.4 360.1 170.4 366.6 154.1V154.1zM405.9 222.9C405.1 223.2 404.3 223.4 403.4 223.6C411.6 209.5 419.1 194.9 425.2 180.7L543.1 133.5C558.9 127.2 576 138.8 576 155.8V426.6C576 436.4 570 445.2 560.9 448.9L405.9 510.9C402.6 512.2 399 512.4 395.6 511.4L176.9 448.9L32.91 506.5C17.15 512.8 0 501.2 0 484.2V213.4C0 203.6 5.975 194.8 15.09 191.1L138.3 141.9C140.4 152.3 143.6 162.7 147.5 172.6L32 218.8V472.4L160 421.2V303.1C160 295.2 167.2 287.1 176 287.1C184.8 287.1 192 295.2 192 303.1V419.9L384 474.8V303.1C384 295.2 391.2 287.1 400 287.1C408.8 287.1 416 295.2 416 303.1V472.4L544 421.2V167.6L405.9 222.9z"></path></svg>`;

        controlBtn.addEventListener('click', function() {
            // Toggle class active
            container.classList.toggle('active');

            // Cập nhật giao diện dựa trên trạng thái class active
            if (container.classList.contains('active')) {
                iconWrapper.innerHTML = mapIcon;
                textLabel.textContent = "Bản đồ";
            } else {
                iconWrapper.innerHTML = listIcon;
                textLabel.textContent = "Danh sách";
            }
        });
    }

    // xử lý uploadfile
    function handleUploadFile() {
        document.getElementById('upload-input').addEventListener('change', function(event) {
            const container = document.getElementById('imageUploadContainer'); 
            const files = event.target.files;
            
            // 1. Lấy số lượng ảnh hiện có trong container
            const currentImages = container.querySelectorAll('.img-preview-item').length;
            
            // 2. Tính toán xem còn được phép thêm bao nhiêu ảnh
            const remainingSlots = 24 - currentImages;

            if (remainingSlots <= 0) {
                alert("Bạn đã đạt giới hạn tối đa 24 ảnh.");
                this.value = ""; // Reset input
                return;
            }

            // 3. Chỉ lặp qua số lượng file cho phép (tối đa là remainingSlots)
            const filesToUpload = Array.from(files).slice(0, remainingSlots);

            if (files.length > remainingSlots) {
                alert(`Bạn chỉ có thể thêm tối đa ${remainingSlots} ảnh nữa.`);
            }

            filesToUpload.forEach(file => {
                if (!file.type.startsWith('image/')) return;

                const reader = new FileReader();
                reader.onload = function(e) {
                    const div = document.createElement('div');
                    div.classList.add('img-preview-item');
                    div.innerHTML = `
                        <img src="${e.target.result}">
                        <button type="button" class="btn-remove-img">✕</button>
                    `;

                    // Logic xóa ảnh khi click nút X
                    div.querySelector('.btn-remove-img').onclick = () => {
                        div.remove();
                    };
                    
                    container.appendChild(div);
                }
                reader.readAsDataURL(file);
            });

            // Reset input để có thể chọn lại cùng 1 file nếu cần
            this.value = ""; 
        });
    }

    // xử lý lấy nội dung khi chuyển slide
   function getContentPrimary(splide, container) {
        // 1. Xác định Slide đang hiển thị chính giữa (Active)
        const activeIndex = splide.index;
        const activeSlide = splide.Components.Slides.getAt(activeIndex).slide;

        if (activeSlide) {
            // --- PHẦN GET: Lấy dữ liệu từ slide hiện tại ---
            const title = activeSlide.querySelector('.js__getTitle')?.innerText;
            const desc = activeSlide.querySelector('.js__getDecription')?.innerHTML; // Lấy cả thẻ p nếu có
            const imgBtn = activeSlide.querySelector('.article-img img')?.getAttribute('src');

            // Tìm container cha lớn nhất để set dữ liệu chính xác
            const mainParent = container.closest('.js__getContentPrimary');

            if (mainParent) {
                // --- PHẦN SET: Đổ dữ liệu ra vùng hiển thị bên ngoài ---
                
                // Set Tiêu đề
                const setTitle = mainParent.querySelector('.js__setTitle a') || mainParent.querySelector('.js__setTitle');
                if (setTitle) setTitle.innerText = title;

                // Set Mô tả
                const setDesc = mainParent.querySelector('.js__setDecription');
                if (setDesc) setDesc.innerHTML = desc;

                // Set Background (Ảnh nền phía sau)
                const setBg = mainParent.querySelector('.js__setBackground img');
                if (setBg && imgBtn) {
                    setBg.setAttribute('src', imgBtn);
                }
            }
        }
    }
    // Khởi tạo slider với một item
    function initSliderOneItems() {
        const oneSlides = document.querySelectorAll(".js__oneSlidesContainer");
        if (oneSlides) {
            oneSlides.forEach((item) => {
                var slider = item.querySelector(".js__oneSlide");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                var pagi = item.querySelector(".swiper-pagination");

                new Swiper(slider, {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    slidesPerGroup: 1,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                    pagination: {
                        el: pagi,
                        clickable: true,
                    },
                    // autoplay: {
                    //     delay: 3000,
                    //     disableOnInteraction: false,
                    // },
                });
            });
        }
    }

    // khởi tạo slider với free item
   function initSliderFreeItems() {
    const freeItems = document.querySelectorAll(".js__freeItemsContainer");

        if (freeItems.length > 0) {
            freeItems.forEach((item) => {
                const sliderElement = item.querySelector(".js__freeSlide");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                var pagi = item.querySelector(".swiper-pagination");
                if (!sliderElement) return;

                const swiper = new Swiper(sliderElement, {
                    slidesPerView: "auto", 
                    spaceBetween: 16, 
                    freeMode: {
                        enabled: true,
                        sticky: true,
                    },
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                    pagination: {
                        el: pagi || null,
                        clickable: true,
                    },
                    grabCursor: true, 
                    watchSlidesProgress: true,
                });
            });
        }
    }
    // khởi tạo slider với 3 item
    function initSliderThreeItems() {
        const threeSlides = document.querySelectorAll(".js__threeSlidesContainer");

        if (threeSlides.length > 0) {
            threeSlides.forEach((item) => {
                var sliderElement = item.querySelector(".js__threeSlide");
                
                if (!sliderElement) return;

                var splide = new Splide(sliderElement, {
                    type   : 'loop',      
                    perPage: 3,        
                    focus  : 'center', 
                    gap    : '20px',   
                    pagination: false, 
                    arrows    : true, 
                    
                    breakpoints: {
                        1024: {
                            perPage: 3,
                            gap    : '20px',
                        },
                        768: {
                            perPage: 3,
                            gap    : '20px',
                        },
                        
                        640: {
                            perPage: 3,
                        }
                    }
                });

                splide.on('mounted move', function () {
                    setTimeout(() => {
                        getContentPrimary(splide, item);
                    }, 0);
                });

                splide.mount();
            });
        }
    }
    // khởi tạo slider với 3 item secondary
    function initSliderThreeItemsSecondary() {
        const threeSlidesSecondary = document.querySelectorAll(".js__threeScondarySlidesContainer");
        if (threeSlidesSecondary) {
            threeSlidesSecondary.forEach((item) => {
                var slider = item.querySelector(".js__threeSlideSecondary");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                var pagi = item.querySelector(".swiper-pagination");
                new Swiper(slider, {
                    slidesPerView: 1.2,
                    spaceBetween: 16,
                    slidesPerGroup: 1,
                    loop:true,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                    pagination: {
                        el: pagi || null,
                        clickable: true,
                    },
                    // autoplay: {
                    //     delay: 3000,
                    //     disableOnInteraction: false,
                    // },
                    breakpoints: {
                        768: {
                            slidesPerView: 1.2,
                            spaceBetween: 16,
                        },
                        1024: {
                            slidesPerView: 2.2,
                            spaceBetween: 16,
                        },
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: 16,
                        },
                    },
                });
            });
        }
    }
    // khởi tạo slider với 4 item
    function initSliderFourItems() {
        const fourSlides = document.querySelectorAll(".js__fourSlidesContainer");
        if (fourSlides) {
            fourSlides.forEach((item) => {
                var slider = item.querySelector(".js__fourSlide");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                var pagi = item.querySelector(".swiper-pagination");
                new Swiper(slider, {
                    slidesPerView: 1.6,
                    spaceBetween: 12,
                    slidesPerGroup: 1,
                    loop:true,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                    pagination: {
                        el: pagi || null,
                        clickable: true,
                    },
                    // autoplay: {
                    //     delay: 3000,
                    //     disableOnInteraction: false,
                    // },
                    breakpoints: {
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1200: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                    },
                });
            });
        }
    }
   
    // khởi tạo slider với 5 item
    function initSliderFiveItemsEmbla() {
        const slideContainers = document.querySelectorAll(".js__fiveSlidesEmblaContainer");

        slideContainers.forEach((container) => {
            const viewportNode = container.querySelector(".js__emblaViewport");
            if (!viewportNode) return;

            const emblaApi = EmblaCarousel(viewportNode, {
                loop: true,
                align: "center",
                skipSnaps: false,
            });

            const slides = emblaApi.slideNodes();
            const totalSlides = slides.length; // Lấy tổng số lượng slide

            // --- CẬP NHẬT HÀM SETACTIVE ---
            const setActive = (index) => {
                // Tính toán index của slide trước và sau (hỗ trợ loop)
                const prevIndex = (index - 1 + totalSlides) % totalSlides;
                const nextIndex = (index + 1) % totalSlides;

                slides.forEach((s, i) => {
                    // Xóa tất cả các class cũ để tránh bị chồng chéo
                    s.classList.remove("is-active", "is-prev", "is-next");

                    if (i === index) {
                        s.classList.add("is-active");
                    } else if (i === prevIndex) {
                        s.classList.add("is-prev");
                    } else if (i === nextIndex) {
                        s.classList.add("is-next");
                    }
                });
            };

            const updateOnSelect = () => {
                const centerIndex = emblaApi.selectedScrollSnap();
                setActive(centerIndex);
            };

            emblaApi.on("select", updateOnSelect);
            
            // --- KHỞI TẠO MẶC ĐỊNH ---
            emblaApi.scrollTo(2, true); 
            setActive(2);

            // --- XỬ LÝ TƯƠNG TÁC ---
            slides.forEach((slide, index) => {
                slide.addEventListener("mouseenter", () => {
                    setActive(index);
                });
                
                slide.addEventListener("click", () => {
                    setActive(index);
                    emblaApi.scrollTo(index);
                });
            });

            container.addEventListener("mouseleave", () => {
                updateOnSelect();
            });
        });
    }
    // khởi tạo slider với 5 item
    function initSliderFiveItems() {
        const fiveSlides = document.querySelectorAll(".js__fiveSlidesContainer");
        if (fiveSlides) {
            fiveSlides.forEach((item) => {
                var slider = item.querySelector(".js__fiveSlide");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                var pagi = item.querySelector(".swiper-pagination");
                new Swiper(slider, {
                    slidesPerView: 1.2,
                    spaceBetween: 12,
                    slidesPerGroup: 1,
                    loop:true,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                    pagination: {
                        el: pagi || null,
                        clickable: true,
                    },
                    // autoplay: {
                    //     delay: 3000,
                    //     disableOnInteraction: false,
                    // },
                    breakpoints: {
                        768: {
                            slidesPerView: 2.2,
                            spaceBetween: 12,
                        },
                        1024: {
                            slidesPerView: 3.2,
                            spaceBetween: 12,
                        },
                        1200: {
                            slidesPerView: 5,
                            spaceBetween: 12,
                        },
                    },
                });
            });
        }
    }
    // khởi tạo slider với 2 item custom
    function initSlideContainerCustomTwoItem() {
        const sliderContainers = document.querySelectorAll('.js__slideContainerCustomTwoItem');

        sliderContainers.forEach(container => {
            const wrapper = container.querySelector('.js__slideListCustomTwoItem');
            const btnNext = container.querySelector('.js__nextSlide');
            const btnPrev = container.querySelector('.js__prevSlide');

            // Khi bấm nút Next
            btnNext.addEventListener('click', () => {
                const itemWidth = container.querySelector('.js__slideItemCustomTwoItem').offsetWidth;
                wrapper.scrollLeft += itemWidth;
            });

            // Khi bấm nút Prev
            btnPrev.addEventListener('click', () => {
                const itemWidth = container.querySelector('.js__slideItemCustomTwoItem').offsetWidth;
                // Cuộn ngược sang trái
                wrapper.scrollLeft -= itemWidth;
            });
        });
    }

    // slider gallery primary
    function initSliderGalleryItemsPrimary () {
        const gallerryPrimary = document.querySelectorAll(".js__swiperGalleryContainerPrimary");
            gallerryPrimary.forEach((item) => {
                var sliderLarge = item.querySelector(".js__swiperGalleryLargePrimary");
                var sliderSmall = item.querySelector(".js__swiperGallerySmallPrimary");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                var pagi = item.querySelector(".swiper-pagination");

                var small = new Swiper(sliderSmall, {
                    spaceBetween: 10,
                    slidesPerView: 2,
                    freeMode: true,
                    watchSlidesProgress: true,
                    // autoplay: {
                    //     delay: 4000,
                    //     disableOnInteraction: false,
                    // },
                    loop: true,
                    navigation: {
                            nextEl: next || null,
                            prevEl: prev || null,
                    },
                    pagination: {
                        el: pagi || null,
                        clickable: true,
                    },
                       
                    breakpoints: {
                        640: {
                            slidesPerView: 1.5,
                        },
                        768: {
                            slidesPerView: 2.5,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        1200: {
                            slidesPerView: 3,
                        },
                    },
                });
                var large = new Swiper(sliderLarge, {
                    spaceBetween: 10,
                    thumbs: {
                        swiper: small,
                    },
                });
                small.on('slideChange', function () {
                    large.slideToLoop(small.realIndex);
                });
               
            });
        }


    // Khởi tạo sticky content 
    function initStickyContent() {
        const stickyContainers = document.querySelectorAll('.js__stickyContainer')
        if (!stickyContainers) return; 
    
        stickyContainers.forEach(item => {
            var stickyElements = [item.querySelector('.js__stickyLeft'), item.querySelector('.js__stickyRight')]
                .filter(element => element !== null); 
    
            stickyElements.forEach(element => {
                $(element).theiaStickySidebar({
                    additionalMarginTop: 130,
                });
            });
        });
    }
    
    // xử lý sự kiện show menu mobile
    function handleMenuMobile () {
        // show menu
        const bod = document.querySelector('body')
        const clickShowMenuMbs = document.querySelectorAll('.js__clickShowMenuMb');
        const closeSubMenuMb = document.querySelector('.js__closeSubMenuMb');
        const subMenuMb = document.querySelector('.js__subMenuMb');

        if(clickShowMenuMbs.length === 0 && !closeSubMenuMb) return;
        clickShowMenuMbs.forEach((clickShowMenuMb)=>{
            clickShowMenuMb.onclick = function() {
                subMenuMb.classList.add('active');
                bod.classList.add('hidden')
            }
        })
        closeSubMenuMb.onclick = function(){
            subMenuMb.classList.remove('active');
            bod.classList.remove('hidden')
        }

        const subMenuMbContainers = document.querySelectorAll('.js__subMenuMbContainer');

        if (subMenuMbContainers.length === 0 ) return;
        
        subMenuMbContainers.forEach((subMenuMbContainer)=>{

            const subMenuMbItems = subMenuMbContainer.querySelectorAll('.js__subMenuMbItem');
            const subMenuMbDropdowns = subMenuMbContainer.querySelectorAll('.js__subMenuMbDropdown');
            
            if (subMenuMbItems.length === 0 ) return;
            
            subMenuMbItems.forEach((subMenuMbItem)=>{
                const showSubMenuMbItem = subMenuMbItem.querySelector('.js__showSubMenuMbItem');
                
                if(!showSubMenuMbItem) return

                showSubMenuMbItem.onclick = function() {
                    subMenuMbItem.classList.toggle('active')
                }
            });

            if (subMenuMbDropdowns.length === 0 ) return;

            subMenuMbDropdowns.forEach((subMenuMbDropdown)=>{
                const showSubMenuMbDropdown = subMenuMbDropdown.querySelector('.js__showSubMenuMbDropdown');
                
                if(!showSubMenuMbDropdown) return

                showSubMenuMbDropdown.onclick = function() {
                    subMenuMbDropdown.classList.toggle('active')
                }
            });

            

        });

    }

    // xử lý sự kiện show search pc
    function handleShowSearchPc() {
        const searchPcs = document.querySelectorAll(".js__searchPc");
        if (searchPcs.length === 0) return;

        searchPcs.forEach((searchPc) => {
            const iconSearchPc = searchPc.querySelector(".js__iconSearchPc");
            const focusElement = searchPc.querySelector(".js__focusSearchPc");

            if (!iconSearchPc || !focusElement) return;

            iconSearchPc.onclick = function (event) {
                event.stopPropagation(); 
                
                searchPc.classList.toggle('active');
                
                if (searchPc.classList.contains('active')) {
                    focusElement.focus();
                } else {
                    focusElement.value = "";
                }
            };

            searchPc.onclick = function (event) {
                event.stopPropagation();
            };
        });

        window.addEventListener('click', function () {
            searchPcs.forEach((searchPc) => {
                if (searchPc.classList.contains('active')) {
                    searchPc.classList.remove('active');
                    const focusElement = searchPc.querySelector(".js__focusSearchPc");
                    if (focusElement) focusElement.value = "";
                }
            });
        });
    }
        // xử lý sự kiện show content
    function handleShowContent() {
        const contentPCs = document.querySelectorAll(".js__contentWrapper");
        if (contentPCs.length === 0) return;

        contentPCs.forEach((contentPC) => {
            const showContentIcon = contentPC.querySelector(".js__showContentIcon");

            if (!showContentIcon) return;

            showContentIcon.onclick = function (event) {
                event.stopPropagation(); 
                
                contentPC.classList.toggle('active');
                
            };

            contentPC.onclick = function (event) {
                event.stopPropagation();
            };
        });

        window.addEventListener('click', function () {
            contentPCs.forEach((contentPC) => {
                if (contentPC.classList.contains('active')) {
                    contentPC.classList.remove('active');
                }
            });
        });
    }

    // xử lý cuộn video short
    function slideVerticalShortVideo() {
        const container = document.querySelector(".js__shortVideoContainer");
        if (!container) return;
        document.body.style.overflow = 'hidden';

        const list = container.querySelector(".js__shortList");
        const items = container.querySelectorAll(".js__shortItem");
        const prevBtn = container.querySelector(".js__prevShort");
        const nextBtn = container.querySelector(".js__nextShort");


        if (!list || items.length === 0) return;

        let currentIndex = 0;
        let isMoving = false; // Biến khóa để chống click liên tục

        // --- 1. Quản lý Video (Play/Pause) ---
        const updateVideoState = () => {
            items.forEach((item, index) => {
                const iframe = item.querySelector("iframe");
                if (!iframe) return;

                let src = iframe.getAttribute("src");
                const isTarget = index === currentIndex;
                
                // Chỉ thực hiện gán lại src nếu trạng thái autoplay thay đổi
                if (isTarget && src.includes("autoplay=0")) {
                    iframe.src = src.replace("autoplay=0", "autoplay=1");
                } else if (!isTarget && src.includes("autoplay=1")) {
                    iframe.src = src.replace("autoplay=1", "autoplay=0");
                }
            });
        };

        // --- 2. Xử lý Cuộn ---
        const scrollToVideo = (index) => {
            if (isMoving) return; // Nếu đang cuộn thì bỏ qua click mới
            isMoving = true;
            
            currentIndex = index;

            // Tính toán khoảng cách chuẩn xác (bao gồm cả Gap/Margin)
            const firstRect = items[0].getBoundingClientRect();
            let stepHeight = firstRect.height;

            if (items.length > 1) {
                const secondRect = items[1].getBoundingClientRect();
                stepHeight = secondRect.top - firstRect.top;
            }

            const translateY = -(currentIndex * stepHeight);
            list.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
            list.style.transform = `translateY(${translateY}px)`;

            updateVideoState();

            // Mở khóa sau khi hiệu ứng transition kết thúc (0.6s)
            setTimeout(() => { isMoving = false; }, 600);
        };

        // --- 3. Khởi tạo Nút Xem thêm (Lồng vào khởi tạo chung) ---
        const initExtendButtons = () => {
            const extendContainers = document.querySelectorAll(".js__extendContainerSecondary");
            extendContainers.forEach((ext) => {
                const btn = ext.querySelector(".js__extendBtn");
                if (!btn) return;
                btn.onclick = function() {
                    ext.classList.toggle('full');
                    this.innerText = ext.classList.contains('full') ? 'Thu gọn' : 'Xem thêm';
                };
            });
        };

        // --- 4. Gán sự kiện Điều hướng ---
        if (nextBtn) {
            nextBtn.onclick = () => {
                const nextIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
                scrollToVideo(nextIndex);
            };
        }

        if (prevBtn) {
            prevBtn.onclick = () => {
                const prevIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
                scrollToVideo(prevIndex);
            };
        }


        // Chạy khởi tạo
        initExtendButtons();
        updateVideoState();
    }

     // xử lý sự kiện active
    function handleActiveElement() {
        const activeElements = document.querySelectorAll('.js__activeElement')
        if (activeElements.length === 0) return;
        
        activeElements.forEach((activeElement)=>{
            
            activeElement.onclick = function() {
                this.classList.toggle('active')
            }
        })
    }
     // xử lý sự kiện active multi element
    function handleActiveMultiElement() {
        const activeMultiContainers = document.querySelectorAll('.js__activeMultiContainer')
        if (activeMultiContainers.length === 0) return;
        
        
        activeMultiContainers.forEach((activeMultiContainer)=>{
            
            const activeMultiElements = activeMultiContainer.querySelectorAll('.js__activeMultiItem')
            
            if (activeMultiElements.length === 0) return;

            activeMultiElements.forEach((activeElement)=>{

                activeElement.onclick = function() {
                    activeMultiContainer.querySelector('.js__activeMultiItem.active').classList.remove('active')
                    this.classList.add('active');
                }
            })
           
        })
    }

    // khởi tạo hàm đếm số lượng ảnh ở detail pagoda
    function initCounterImagesDetailPagoda() {
        const galleries = document.querySelectorAll('.js__galleryImages');

        galleries.forEach((gallery) => {
            const items = gallery.querySelectorAll('.js__imgItem');
            
            if (items.length > 5) {
                const fifthItem = items[4];
                const remaining = items.length - 5; 
                fifthItem.style.setProperty('--count', `"+${remaining}"`);
            }
        });
    }


    // Khởi tạo fancybox
    function initFancybox() {
        const fancyboxes = document.querySelectorAll(".fancybox-full");
        if (fancyboxes) {
            fancyboxes.forEach(function () {
                $(".fancybox-full a").fancybox();
            });
        }
    }

    // Xử lý thanh header dính
    function handleStickyHeader() {
        const stickyHeaderPC = document.querySelector(".js__stickyHeader");
        if (stickyHeaderPC) {
            const isSticky = scrollY > 300;
            stickyHeaderPC.classList.toggle("sticky", isSticky);
        }
    }

    // Xử lý sự kiện khi nhấn nút "back to top"
    function handleBackTop() {
    
        if (!backTop) return;

        backTop.onclick = function () {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        };

    }

    // Xử lý hiển thị nút backTop dựa trên vị trí cuộn trang
    function handleBackTopVisibility() {
        if (backTop) {
            if (
                document.body.scrollTop > 300 ||
                document.documentElement.scrollTop > 300
            ) {
                backTop.style.opacity = 1;
                backTop.style.visibility = "visible";
            } else {
                backTop.style.opacity = 0;
                backTop.style.visibility = "hidden";
            }
        }
    }

    // Xử lý sự kiện khi cuộn trang
    function handleWindowScroll() {
        handleStickyHeader();
        handleBackTopVisibility();
        if (typeof scrollToVideo === 'function') {
            const list = document.querySelector(".js__shortList");
            if (list) list.style.transition = "none"; 
            
            scrollToVideo(currentIndex);
        }
        
    }

    // Khởi tạo tất cả các chức năng
    function initApp() {
        handleShowSearchPc();
        handleShowContent();
        handleMenuMobile();
        initStickyContent();
        handleShowFullContent();
        slideVerticalShortVideo();
        handleActiveElement();
        handleShowHiddenDigitalLibrary();
        handleCollapse();
        handleAudio();
        handlePagodaPrimary();
        initCounterImagesDetailPagoda();
        handlePopupDetailPagoda();
        handlePopupFeedbackPagoda();
        handleUploadFile();
        // slide
        initSliderFreeItems();
        initSliderOneItems();
        initSlideContainerCustomTwoItem();
        initSliderThreeItems();
        initSliderThreeItemsSecondary();
        initSliderFourItems();
        initSliderFiveItemsEmbla();
        initSliderFiveItems();
        initSliderGalleryItemsPrimary();
        
        // end slide
        handleBackTop();
        initFancybox();
        handleChangeTab();
        window.addEventListener('scroll',handleWindowScroll);
        window.addEventListener('resize',handleWindowScroll);
    }

    // Bắt đầu khởi tạo ứng dụng
    initApp();
});