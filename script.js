// script.js

// --- Proje Veritabanı ---
const projectsData = {
    'seyir-fuzesi': {
        title: 'Taktik Ses Altı Seyir Füzesi Tasarımı',
        img: 'assets/seyir_fuzesi_dis.jpg', 
        ozet: '<p>+200 km menzil, 20 kg faydalı yük ve 100 bin dolar üretim bütçesi kısıtları doğrultusunda taktik ses altı seyir füzesinin kavramsal ve ön tasarım süreci.</p><br><p>Bu projede aerodinamik hesaplamalardan, motor boyutlandırmasına ve uçuş kontrol algoritmalarına kadar tüm alt sistemler ele alınmıştır.</p>',
        teknik: '<ul class="list-disc list-inside space-y-2 text-gray-300"><li><strong>Hava Alığı (Inlet) Tasarımı:</strong> Aerodinamik tasarım süreçlerinin yönetilmesi.</li><li><strong>CFD Analizleri:</strong> ANSYS Fluent kullanılarak 3B aerodinamik analizlerin yapılması.</li><li><strong>Kanat Optimizasyonu:</strong> XFLR5 kullanılarak kanat profili optimizasyonu.</li><li><strong>Uçuş Dinamiği:</strong> MATLAB üzerinde uçuş algoritmaları ve kapalı çevrim uçuş kontrol mimarisi.</li></ul>',
        gorsel: `
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                <div class="space-y-2 group">
                    <img src="assets/seyir_fuzesi_dis.jpg" onclick="openLightbox(this.src)" title="Büyütmek için tıklayın" class="cursor-pointer rounded-xl w-full h-56 object-cover border border-gray-700 shadow-lg hover:border-brand-light hover:scale-[1.02] transition-all">
                    <p class="text-sm font-medium text-center text-brand-light">Dış Tasarım</p>
                </div>
                <div class="space-y-2 group">
                    <img src="assets/seyir_fuzesi_yerlesim.jpg" onclick="openLightbox(this.src)" title="Büyütmek için tıklayın" class="cursor-pointer rounded-xl w-full h-56 object-cover border border-gray-700 shadow-lg hover:border-brand-light hover:scale-[1.02] transition-all">
                    <p class="text-sm font-medium text-center text-brand-light">İç Yerleşim</p>
                </div>
                <div class="space-y-2 sm:col-span-2 group">
                    <img src="assets/velocity_contour.jpg" onclick="openLightbox(this.src)" title="Büyütmek için tıklayın" class="cursor-pointer rounded-xl w-full object-cover border border-gray-700 shadow-lg hover:border-brand-light hover:scale-[1.02] transition-all">
                    <p class="text-sm font-medium text-center text-brand-light">0 Derece AoA Hız Kontur Analizi (CFD)</p>
                </div>
                <div class="space-y-2 group">
                    <img src="assets/air_intake_design.jpg" onclick="openLightbox(this.src)" title="Büyütmek için tıklayın" class="cursor-pointer rounded-xl w-full h-56 object-cover border border-gray-700 shadow-lg hover:border-brand-light hover:scale-[1.02] transition-all">
                    <p class="text-sm font-medium text-center text-brand-light">Hava Alığı (Air Intake)</p>
                </div>
                <div class="space-y-2 group">
                    <img src="assets/cad_sketch_of_inlet.jpg" onclick="openLightbox(this.src)" title="Büyütmek için tıklayın" class="cursor-pointer rounded-xl w-full h-56 object-cover border border-gray-700 shadow-lg hover:border-brand-light hover:scale-[1.02] transition-all">
                    <p class="text-sm font-medium text-center text-brand-light">Inlet CAD Çizimi</p>
                </div>
            </div>
        `
    },
    'turbofan': {
        title: 'Art Yakıcılı Turbofan PCA Aracı',
        img: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=800&q=80',
        ozet: '<p>Kullanıcı tanımlı uçuş koşulları ve operasyonel değişkenlere dayalı olarak art yakıcılı turbofan motorların parametrik çevrim analizini (PCA) gerçekleştiren etkileşimli bir araç.</p>',
        teknik: '<ul class="list-disc list-inside space-y-2 text-gray-300"><li><strong>Kullanılan Yazılım:</strong> MATLAB</li><li>Uçuş koşullarına göre motor itki, özgül yakıt tüketimi ve verim hesaplamaları.</li><li>Kullanıcı dostu interaktif arayüz ile parametrik değişkenlerin anlık sonuçlara etkisinin incelenmesi.</li></ul>',
    },
    'roket': {
        title: 'Statera Orta İrtifa Roket Takımı',
        img: 'https://images.unsplash.com/photo-1517976384346-3136801d605d?auto=format&fit=crop&w=800&q=80',
        ozet: '<p>Teknofest 2024 kapsamında tasarlanan orta irtifa roket projesi. Yapısal tasarım ve yörünge simülasyonları gibi kritik görevler üstlenilmiştir.</p>',
        teknik: '<ul class="list-disc list-inside space-y-2 text-gray-300"><li><strong>Simülasyon:</strong> 3 Serbestlik Dereceli (3DOF) uçuş ve yörünge simülasyon raporlarının hazırlanması.</li><li><strong>Yapısal Tasarım:</strong> Aktif çift kademeli ayrılma sistemlerinin üretimine teknik katkı.</li><li><strong>Araçlar:</strong> OpenRocket, MATLAB, SolidWorks.</li></ul>',
    },
    'kanat': {
        title: 'Kanat Profili Optimizasyonu & Kontrol',
        img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
        ozet: '<p>Dönem projesi kapsamında, MATLAB ve XFOIL betikleri kullanılarak otomatik aerodinamik polar optimizasyonunun gerçekleştirilmesi.</p>',
        teknik: '<ul class="list-disc list-inside space-y-2 text-gray-300"><li><strong>Otomasyon:</strong> MATLAB-XFOIL bağlantısı kurularak aerodinamik polar (Cl/Cd) verilerinin optimize edilmesi.</li><li><strong>Kontrol:</strong> Simulink ortamında PID denetleyicili kapalı çevrim istikamet dümeni (rudder) kontrolcüsü tasarımı.</li></ul>',
    }
};

// --- Modal Fonksiyonları ---
const modal = document.getElementById('projectModal');
const modalContentBox = document.getElementById('modalContentBox');

window.openProjectModal = function(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalImg').src = data.img;
    document.getElementById('tab-ozet').innerHTML = data.ozet;
    document.getElementById('tab-teknik').innerHTML = data.teknik;
    
    const gorselTab = document.getElementById('tab-gorsel');
    if (data.gorsel) {
        gorselTab.innerHTML = data.gorsel;
    } else {
        gorselTab.innerHTML = `
            <div class="p-8 border-2 border-dashed border-gray-700 rounded-xl text-center text-gray-500">
                <i class="fas fa-image text-4xl mb-3"></i>
                <p>Analiz (CFD, FEA vb.) çıktılarını veya proje görsellerini buraya ekleyebilirsiniz.</p>
            </div>
        `;
    }

    modal.classList.remove('hidden');
    setTimeout(() => {
        modalContentBox.classList.remove('scale-95', 'opacity-0');
        modalContentBox.classList.add('scale-100', 'opacity-100');
    }, 10);
    
    switchModalTab('ozet');
    document.body.style.overflow = 'hidden';
}

window.closeProjectModal = function() {
    modalContentBox.classList.remove('scale-100', 'opacity-100');
    modalContentBox.classList.add('scale-95', 'opacity-0');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        // Sadece lightbox açık değilse scroll'u geri aç
        if (document.getElementById('lightboxModal').classList.contains('hidden')) {
            document.body.style.overflow = 'auto'; 
        }
    }, 300);
}

// --- Lightbox Fonksiyonları ---
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');

window.openLightbox = function(src) {
    lightboxImg.src = src;
    lightboxModal.classList.remove('hidden');
    
    setTimeout(() => {
        lightboxImg.classList.remove('scale-95');
        lightboxImg.classList.add('scale-100');
    }, 10);
}

window.closeLightbox = function() {
    lightboxImg.classList.remove('scale-100');
    lightboxImg.classList.add('scale-95');
    
    setTimeout(() => {
        lightboxModal.classList.add('hidden');
        lightboxImg.src = ''; // Clear source so it doesn't flash old image next time
    }, 300);
}

// Sekme Değiştirme Fonksiyonu
window.switchModalTab = function(tabName) {
    document.querySelectorAll('.modal-tab-content').forEach(tab => {
        tab.classList.add('hidden');
        tab.classList.remove('block');
    });
    const activeTab = document.getElementById('tab-' + tabName);
    activeTab.classList.remove('hidden');
    activeTab.classList.add('block');

    document.querySelectorAll('.modal-tab-btn').forEach(btn => {
        btn.classList.remove('border-brand-light', 'text-brand-light');
        btn.classList.add('border-transparent', 'text-gray-400');
    });
    const activeBtn = document.getElementById('btn-' + tabName);
    activeBtn.classList.remove('border-transparent', 'text-gray-400');
    activeBtn.classList.add('border-brand-light', 'text-brand-light');
}

// Esc tuşu ile kapatma
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        if (!lightboxModal.classList.contains('hidden')) {
            closeLightbox();
        } else if (!modal.classList.contains('hidden')) {
            closeProjectModal();
        }
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal on Scroll
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);
    reveals.forEach(reveal => revealOnScroll.observe(reveal));

    // 2. Navbar Background on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // 3. 3D Space Starfield Background
    const canvas = document.getElementById('space-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];
    const numStars = 400;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    class Star {
        constructor() { this.reset(); }
        reset() {
            this.x = (Math.random() - 0.5) * width;
            this.y = (Math.random() - 0.5) * height;
            this.z = Math.random() * width;
            this.radius = Math.random() * 1.5;
        }
        update() {
            this.z -= 0.5;
            if (this.z <= 0) {
                this.reset();
                this.z = width;
            }
        }
        draw() {
            let x = (this.x / this.z) * width + width / 2;
            let y = (this.y / this.z) * height + height / 2;
            let r = this.radius * (width / this.z);
            if (x < 0 || x > width || y < 0 || y > height) return;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${1 - this.z / width})`;
            ctx.fill();
        }
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) { stars.push(new Star()); }
    }

    function animateStars() {
        ctx.fillStyle = 'rgba(9, 10, 15, 0.2)';
        ctx.fillRect(0, 0, width, height);
        stars.forEach(star => { star.update(); star.draw(); });
        requestAnimationFrame(animateStars);
    }

    window.addEventListener('resize', resize);
    resize();
    initStars();
    animateStars();
});
