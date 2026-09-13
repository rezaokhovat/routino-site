(function() {
      // داده‌های پایه تعرفه استودیو روتینو
      const packageRates = {
        'empty-location': {
          name: 'لوکیشن خالی',
          startRate: 650000,
          endRate: 500000,
          type: 'linear'
        },
        '1-camera': {
          name: '۱ دوربین سینمایی',
          baseHourly: 1600000,
          type: 'camera'
        },
        '2-cameras': {
          name: '۲ دوربین (پیشنهادی)',
          baseHourly: 2000000,
          type: 'camera'
        },
        '3-cameras': {
          name: '۳ دوربین فول‌ست',
          baseHourly: 2400000,
          type: 'camera'
        }
      };

      const durationRange = document.getElementById('durationRange');
      const durationText = document.getElementById('durationText');
      const btnMinus = document.getElementById('btn-minus');
      const btnPlus = document.getElementById('btn-plus');
      const discountRuleText = document.getElementById('discountRuleText');

      // المان‌های پیش‌فاکتور
      const receiptPackageName = document.getElementById('receiptPackageName');
      const receiptDuration = document.getElementById('receiptDuration');
      const receiptBasePrice = document.getElementById('receiptBasePrice');
      const receiptDiscountPercent = document.getElementById('receiptDiscountPercent');
      const receiptDiscountAmount = document.getElementById('receiptDiscountAmount');
      const receiptHourlyAvg = document.getElementById('receiptHourlyAvg');
      const receiptFinalTotal = document.getElementById('receiptFinalTotal');
      const receiptEquipList = document.getElementById('receiptEquipList');
      const equipCheckboxes = document.querySelectorAll('.equip-checkbox');

      function formatFa(num) {
        return num.toLocaleString('fa-IR');
      }

      function getSelectedPackage() {
        const checked = document.querySelector('input[name="studio_package"]:checked');
        return checked ? checked.value : '2-cameras';
      }

      // منطق اصلی دقیق محاسبه روتینو مطابق با routino-price-calculator.html
      function calculateRoutinoPrice() {
        const pkgKey = getSelectedPackage();
        const pkgData = packageRates[pkgKey];
        const hours = parseInt(durationRange.value, 10);

        durationText.textContent = formatFa(hours) + ' ساعت';
        receiptDuration.textContent = formatFa(hours) + ' ساعت';
        receiptPackageName.textContent = pkgData.name;

        // هایلایت کارت رادیوباتن انتخاب شده
        ['empty-location', '1-camera', '2-cameras', '3-cameras'].forEach(key => {
          const card = document.getElementById('card-' + key);
          if (card) {
            if (key === pkgKey) {
              card.classList.add('border-brand-red', 'bg-brand-red/5', 'ring-1', 'ring-brand-red');
              card.classList.remove('border-outline-variant/40', 'bg-surface');
            } else {
              card.classList.remove('border-brand-red', 'bg-brand-red/5', 'ring-1', 'ring-brand-red');
              card.classList.add('border-outline-variant/40', 'bg-surface');
            }
          }
        });

        let basePrice = 0;
        let finalPrice = 0;
        let discountAmount = 0;
        let discountPercent = 0;

        if (pkgData.type === 'linear') {
          // برای لوکیشن خالی: نرخ ساعتی از ۶۵۰ هزار تومان برای ۱ ساعت تا ۵۰۰ هزار تومان برای ۱۲ ساعت کاهش می‌یابد
          const hourlyRate = hours === 1 
            ? pkgData.startRate 
            : pkgData.startRate - ((hours - 1) / 11) * (pkgData.startRate - pkgData.endRate);
          
          basePrice = pkgData.startRate * hours;
          finalPrice = Math.round(hourlyRate * hours);
          discountAmount = basePrice - finalPrice;
          discountPercent = basePrice > 0 ? ((discountAmount / basePrice) * 100).toFixed(1) : 0;

          discountRuleText.textContent = 'کاهش نرخ ساعتی از ۶۵۰ به ' + formatFa(Math.round(hourlyRate)) + ' تومان برای ' + formatFa(hours) + ' ساعت';
        } else {
          // برای پکیج‌های ۱، ۲ و ۳ دوربین:
          basePrice = pkgData.baseHourly * hours;
          const discountSteps = Math.floor(hours / 2);
          discountPercent = discountSteps * 2.5;
          discountAmount = Math.round(basePrice * (discountPercent / 100));
          finalPrice = basePrice - discountAmount;

          if (discountPercent > 0) {
            discountRuleText.textContent = 'تخفیف ' + formatFa(discountPercent) + '٪ روتینو (' + formatFa(discountSteps) + ' پله ۲ ساعته)';
          } else {
            discountRuleText.textContent = 'برای دریافت تخفیف پلکانی، مدت زمان را حداقل ۲ ساعت انتخاب کنید.';
          }
        }

        const hourlyAvg = Math.round(finalPrice / hours);

        // بروزرسانی پیش‌فاکتور
        receiptBasePrice.textContent = formatFa(basePrice) + ' تومان';
        receiptDiscountPercent.textContent = '(' + formatFa(discountPercent) + '٪)';
        receiptDiscountAmount.textContent = discountAmount > 0 ? ('-' + formatFa(discountAmount) + ' تومان') : '۰ تومان';
        receiptHourlyAvg.textContent = formatFa(hourlyAvg) + ' تومان';
        receiptFinalTotal.textContent = formatFa(finalPrice);

        // بروزرسانی لیست تجهیزات رایگان
        receiptEquipList.innerHTML = '';
        let hasEquip = false;
        equipCheckboxes.forEach(cb => {
          if (cb.checked) {
            hasEquip = true;
            const li = document.createElement('li');
            li.className = 'flex items-center gap-1.5';
            li.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span><span>' + cb.getAttribute('data-name') + '</span>';
            receiptEquipList.appendChild(li);
          }
        });
        if (!hasEquip) {
          receiptEquipList.innerHTML = '<li class="text-on-surface-variant">هیچ تجهیز جانبی انتخاب نشده است.</li>';
        }
      }

      // گوش دادن به تغییرات ماشین‌حساب
      durationRange.addEventListener('input', calculateRoutinoPrice);

      btnMinus.addEventListener('click', () => {
        let val = parseInt(durationRange.value, 10);
        if (val > 1) {
          durationRange.value = val - 1;
          calculateRoutinoPrice();
        }
      });

      btnPlus.addEventListener('click', () => {
        let val = parseInt(durationRange.value, 10);
        if (val < 12) {
          durationRange.value = val + 1;
          calculateRoutinoPrice();
        }
      });

      document.querySelectorAll('input[name="studio_package"]').forEach(radio => {
        radio.addEventListener('change', calculateRoutinoPrice);
      });

      equipCheckboxes.forEach(cb => {
        cb.addEventListener('change', calculateRoutinoPrice);
      });

      // اجرای اولیه ماشین حساب
      calculateRoutinoPrice();

      // ============================================
      // لاجیک کامل و تعاملی اسلایدر گالری فضای استودیو روتینو
      // ============================================
      const sliderWrapper = document.getElementById('studio-image-slider-wrapper');
      const slides = document.querySelectorAll('#slider-track .slider-slide');
      const dots = document.querySelectorAll('#slider-dots .slider-dot');
      const btnPrev = document.getElementById('slider-btn-prev');
      const btnNext = document.getElementById('slider-btn-next');
      let currentSlide = 0;
      const totalSlides = slides.length;
      let autoplayTimer = null;

      function goToSlide(index) {
        if (index < 0) {
          currentSlide = totalSlides - 1;
        } else if (index >= totalSlides) {
          currentSlide = 0;
        } else {
          currentSlide = index;
        }

        // بروزرسانی اسلایدها با ترنزیشن فید شکیل
        slides.forEach((slide, idx) => {
          if (idx === currentSlide) {
            slide.classList.remove('opacity-0', 'pointer-events-none', 'z-0');
            slide.classList.add('opacity-100', 'z-10');
          } else {
            slide.classList.remove('opacity-100', 'z-10');
            slide.classList.add('opacity-0', 'pointer-events-none', 'z-0');
          }
        });

        // بروزرسانی وضعیت دات‌ها
        dots.forEach((dot, idx) => {
          if (idx === currentSlide) {
            dot.className = 'slider-dot w-6 h-2 rounded-full bg-brand-red transition-all duration-300';
          } else {
            dot.className = 'slider-dot w-2 h-2 rounded-full bg-white/70 hover:bg-white transition-all duration-300';
          }
        });
      }

      function nextSlide() {
        goToSlide(currentSlide + 1);
      }

      function prevSlide() {
        goToSlide(currentSlide - 1);
      }

      function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(nextSlide, 4000);
      }

      function stopAutoplay() {
        if (autoplayTimer) {
          clearInterval(autoplayTimer);
          autoplayTimer = null;
        }
      }

      if (btnPrev && btnNext) {
        // در چیدمان RTL دکمه راست به سمت قبلی و دکمه چپ به سمت بعدی است
        btnPrev.addEventListener('click', () => {
          prevSlide();
          startAutoplay();
        });

        btnNext.addEventListener('click', () => {
          nextSlide();
          startAutoplay();
        });
      }

      // کلیک روی نقاط اندیکاتور
      dots.forEach(dot => {
        dot.addEventListener('click', () => {
          const targetIndex = parseInt(dot.getAttribute('data-slide-to'), 10);
          goToSlide(targetIndex);
          startAutoplay();
        });
      });

      // توقف چرخش خودکار هنگام رفتن ماوس روی اسلایدر (Pause on Hover)
      if (sliderWrapper) {
        sliderWrapper.addEventListener('mouseenter', stopAutoplay);
        sliderWrapper.addEventListener('mouseleave', startAutoplay);
      }

      // شروع اولیه چرخش خودکار اسلایدر
      startAutoplay();

    })();