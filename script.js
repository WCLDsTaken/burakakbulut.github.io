// script.js

// --- Turbojet PCA Canlı Hesaplayıcı (MATLAB'den uyarlandı) ---
window.calculateTurbojet = function() {
    const M0 = parseFloat(document.getElementById('sim-M0').value);
    const T0 = parseFloat(document.getElementById('sim-T0').value);
    const pi_c = parseFloat(document.getElementById('sim-pic').value);
    const Tt4 = parseFloat(document.getElementById('sim-Tt4').value);
    const Tt7 = parseFloat(document.getElementById('sim-Tt7').value);

    // Ekranda değerleri güncelle
    document.getElementById('val-M0').innerText = M0.toFixed(2);
    document.getElementById('val-T0').innerText = T0.toFixed(1) + ' K';
    document.getElementById('val-pic').innerText = pi_c.toFixed(1);
    document.getElementById('val-Tt4').innerText = Tt4.toFixed(0) + ' K';
    document.getElementById('val-Tt7').innerText = Tt7.toFixed(0) + ' K';

    // Termodinamik Sabitler
    const gamma = 1.4;
    const cp = 1004.83;
    const hPR = 42800e3;
    const R = cp * (1 - 1/gamma);

    // Hesaplamalar
    const a0 = Math.sqrt(gamma * R * T0);
    const V0 = M0 * a0;

    const tau_r = 1 + (((gamma - 1) / 2) * Math.pow(M0, 2));
    const tau_lambda = Tt4 / T0;
    const tau_c = Math.pow(pi_c, (gamma - 1) / gamma);
    // const tau_t = 1 - ((tau_r / tau_lambda) * (tau_c - 1));
    const tau_ab = Tt7 / T0;

    const V9_a0_sq_term1 = 2 / (gamma - 1);
    const V9_a0_sq_term2 = tau_lambda / (tau_r * tau_c);
    const V9_a0_sq_term3 = tau_lambda - (tau_r * (tau_c - 1));
    
    let F_m0 = 0, S = 0, etaT = 0, etaP = 0, etaO = 0;
    
    if (V9_a0_sq_term3 > 0) {
        const V9_a0_sq = V9_a0_sq_term1 * tau_ab * (1 - (V9_a0_sq_term2 / V9_a0_sq_term3));
        
        if (V9_a0_sq > 0) {
            const V9 = Math.sqrt(V9_a0_sq) * a0;
            F_m0 = V9 - V0;

            const Tt0 = T0 * tau_r;
            const Tt3 = Tt0 * tau_c;
            const f_total = ((cp * T0) / hPR) * (tau_ab - tau_r);

            if (F_m0 > 0 && f_total > 0) {
                S = f_total / F_m0;
                etaT = ((gamma - 1) * cp * T0 * (V9_a0_sq - Math.pow(M0, 2))) / (2 * f_total * hPR);
                etaP = (2 * M0) / (Math.sqrt(V9_a0_sq) + M0);
                etaO = etaP * etaT;
            }
        }
    }

    // Sonuçları Ekrana Bas
    document.getElementById('res-Fm0').innerText = F_m0 > 0 ? F_m0.toFixed(1) + ' (N·s)/kg' : 'İtki Yok';
    document.getElementById('res-Fm0').className = F_m0 > 0 ? 'text-white font-bold text-lg' : 'text-red-500 font-bold text-lg';
    
    document.getElementById('res-S').innerText = S > 0 ? (S * 1e6).toFixed(2) + ' mg/(N·s)' : '-';
    document.getElementById('res-etaT').innerText = etaT > 0 ? (etaT * 100).toFixed(1) + '%' : '-';
    document.getElementById('res-etaP').innerText = etaP > 0 ? (etaP * 100).toFixed(1) + '%' : '-';
    document.getElementById('res-etaO').innerText = etaO > 0 ? (etaO * 100).toFixed(1) + '%' : '-';
}

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
        img: 'assets/engine.gif',
        ozet: '<p>Kullanıcı tanımlı uçuş koşulları ve operasyonel değişkenlere dayalı olarak art yakıcılı turbofan motorların parametrik çevrim analizini (PCA) gerçekleştiren etkileşimli bir MATLAB aracı.</p>',
        teknik: '<ul class="list-disc list-inside space-y-2 text-gray-300"><li><strong>Hesaplama Algoritması:</strong> İdeal gaz kurallarına dayalı parametrik çevrim (Parametric Cycle) denklemleri.</li><li><strong>İncelenen Parametreler:</strong> Spesifik İtki (F/m0), Özgül Yakıt Tüketimi (TSFC), Isıl ve İtki Verimi (Thermal & Propulsive Efficiency).</li><li><strong>Arayüz:</strong> MATLAB App Designer ile geliştirilmiş grafiksel kullanıcı arayüzü (.mlapp).</li></ul>',
        gorsel: `
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                <div class="space-y-2 group sm:col-span-2">
                    <img src="assets/engine.gif" onclick="openLightbox(this.src)" title="Büyütmek için tıklayın" class="cursor-pointer rounded-xl w-full h-64 object-cover border border-gray-700 shadow-lg hover:border-brand-light hover:scale-[1.02] transition-all">
                    <p class="text-sm font-medium text-center text-brand-light">Motor Animasyonu & Çalışma Prensibi</p>
                </div>
                <div class="space-y-2 group">
                    <img src="assets/f_vs_m0.png" onclick="openLightbox(this.src)" title="Büyütmek için tıklayın" class="cursor-pointer rounded-xl w-full h-48 object-cover border border-gray-700 shadow-lg hover:border-brand-light hover:scale-[1.02] transition-all bg-white p-2">
                    <p class="text-sm font-medium text-center text-brand-light">Spesifik İtki - Mach Sayısı (F/m0 vs M0)</p>
                </div>
                <div class="space-y-2 group">
                    <img src="assets/tsfc_pic.png" onclick="openLightbox(this.src)" title="Büyütmek için tıklayın" class="cursor-pointer rounded-xl w-full h-48 object-cover border border-gray-700 shadow-lg hover:border-brand-light hover:scale-[1.02] transition-all bg-white p-2">
                    <p class="text-sm font-medium text-center text-brand-light">Özgül Yakıt Tüketimi (TSFC)</p>
                </div>
                <div class="space-y-2 group">
                    <img src="assets/allefficiencies_pic.png" onclick="openLightbox(this.src)" title="Büyütmek için tıklayın" class="cursor-pointer rounded-xl w-full h-48 object-cover border border-gray-700 shadow-lg hover:border-brand-light hover:scale-[1.02] transition-all bg-white p-2">
                    <p class="text-sm font-medium text-center text-brand-light">Verim Grafikleri</p>
                </div>
                <div class="space-y-2 group">
                    <img src="assets/nt_vs_pic.png" onclick="openLightbox(this.src)" title="Büyütmek için tıklayın" class="cursor-pointer rounded-xl w-full h-48 object-cover border border-gray-700 shadow-lg hover:border-brand-light hover:scale-[1.02] transition-all bg-white p-2">
                    <p class="text-sm font-medium text-center text-brand-light">Termal Verim Analizi</p>
                </div>
            </div>
        `,
        sim: `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                <!-- Inputs -->
                <div class="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                    <h3 class="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-2"><i class="fas fa-sliders-h mr-2"></i>Uçuş & Motor Değerleri</h3>
                    
                    <div class="space-y-6">
                        <div>
                            <div class="flex justify-between mb-1">
                                <label class="text-sm font-medium text-gray-400">Mach Sayısı (M0)</label>
                                <span id="val-M0" class="text-brand-light font-mono">0.80</span>
                            </div>
                            <input type="range" id="sim-M0" min="0" max="3" step="0.05" value="0.8" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" oninput="calculateTurbojet()">
                        </div>
                        <div>
                            <div class="flex justify-between mb-1">
                                <label class="text-sm font-medium text-gray-400">Ortam Sıcaklığı (T0)</label>
                                <span id="val-T0" class="text-brand-light font-mono">216.6 K</span>
                            </div>
                            <input type="range" id="sim-T0" min="200" max="300" step="1" value="216.6" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" oninput="calculateTurbojet()">
                        </div>
                        <div>
                            <div class="flex justify-between mb-1">
                                <label class="text-sm font-medium text-gray-400">Kompresör Basınç Oranı (πc)</label>
                                <span id="val-pic" class="text-brand-light font-mono">20.0</span>
                            </div>
                            <input type="range" id="sim-pic" min="5" max="40" step="0.5" value="20" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" oninput="calculateTurbojet()">
                        </div>
                        <div>
                            <div class="flex justify-between mb-1">
                                <label class="text-sm font-medium text-gray-400">Türbin Giriş Sıc. (Tt4)</label>
                                <span id="val-Tt4" class="text-brand-light font-mono">1600 K</span>
                            </div>
                            <input type="range" id="sim-Tt4" min="1000" max="2200" step="10" value="1600" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" oninput="calculateTurbojet()">
                        </div>
                        <div>
                            <div class="flex justify-between mb-1">
                                <label class="text-sm font-medium text-gray-400">Art Yakıcı Sıc. (Tt7)</label>
                                <span id="val-Tt7" class="text-brand-light font-mono">1800 K</span>
                            </div>
                            <input type="range" id="sim-Tt7" min="1000" max="2500" step="10" value="1800" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" oninput="calculateTurbojet()">
                        </div>
                    </div>
                </div>
                
                <!-- Outputs -->
                <div class="bg-gray-800/50 p-6 rounded-xl border border-gray-700 relative overflow-hidden">
                    <div class="absolute -right-6 -bottom-6 opacity-5 pointer-events-none">
                        <i class="fas fa-fighter-jet text-9xl text-brand-light transform -rotate-45"></i>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-2"><i class="fas fa-chart-bar mr-2"></i>Analiz Sonuçları (Canlı)</h3>
                    
                    <div class="space-y-4 relative z-10">
                        <div class="flex justify-between items-center p-3 bg-space-900 rounded-lg border border-gray-700 shadow-inner">
                            <span class="text-gray-400 text-sm">Spesifik İtki (F/m0)</span>
                            <span id="res-Fm0" class="text-white font-bold text-lg">0.0</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-space-900 rounded-lg border border-gray-700 shadow-inner">
                            <span class="text-gray-400 text-sm">Özgül Yakıt Tük. (S)</span>
                            <span id="res-S" class="text-white font-bold text-lg">0.0</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-space-900 rounded-lg border border-gray-700 shadow-inner">
                            <span class="text-gray-400 text-sm">Termal Verim (ηT)</span>
                            <span id="res-etaT" class="text-green-400 font-bold text-lg">0.0%</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-space-900 rounded-lg border border-gray-700 shadow-inner">
                            <span class="text-gray-400 text-sm">İtki Verimi (ηP)</span>
                            <span id="res-etaP" class="text-green-400 font-bold text-lg">0.0%</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-space-900 rounded-lg border border-gray-700 shadow-inner">
                            <span class="text-gray-400 text-sm">Genel Verim (ηO)</span>
                            <span id="res-etaO" class="text-green-400 font-bold text-lg">0.0%</span>
                        </div>
                    </div>
                    
                    <div class="mt-6 text-xs text-gray-500 italic text-center">
                        * Arkada çalışan MATLAB (ideal parametrik çevrim) algoritmanız JavaScript'e dönüştürülerek tarayıcıda çalıştırılmaktadır.
                    </div>
                </div>
            </div>
            
            <style>
                input[type=range] { -webkit-appearance: none; }
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none; appearance: none;
                    width: 16px; height: 16px; border-radius: 50%;
                    background: #38bdf8; cursor: pointer;
                    box-shadow: 0 0 10px rgba(56,189,248,0.5);
                }
            </style>
        `
    },
    'roket': {
        title: 'Statera Orta İrtifa Roket Takımı',
        img: 'https://images.unsplash.com/photo-1517976384346-3136801d605d?auto=format&fit=crop&w=800&q=80',
        ozet: '<p>Teknofest 2024 kapsamında tasarlanan orta irtifa roket projesi. Yapısal tasarım ve yörünge simülasyonları gibi kritik görevler üstlenilmiştir.</p>',
        teknik: '<ul class="list-disc list-inside space-y-2 text-gray-300"><li><strong>Simülasyon:</strong> 3 Serbestlik Dereceli (3DOF) uçuş ve yörünge simülasyon raporlarının hazırlanması.</li><li><strong>Yapısal Tasarım:</strong> Aktif çift kademeli ayrılma sistemlerinin üretimine teknik katkı.</li><li><strong>Araçlar:</strong> OpenRocket, MATLAB, SolidWorks.</li></ul>',
    },
    'kanat': {
        title: 'Kritik Mach Sayısı (Mcr) Optimizasyonu',
        img: 'assets/airfoil_poly.png',
        ozet: '<p>Sıkıştırılabilir aerodinamik (Compressible Aerodynamics) ilkeleri kullanılarak asimetrik bir kanat profilinin Kritik Mach sayısını (Mcr) maksimize etme projesi.</p><br><p>Hess-Smith panel metodu tabanlı kendi hesaplama algoritmamız ve MATLAB <code>fmincon</code> aracı kullanılarak, şok dalgası oluşumunu geciktiren en optimum polinom ve spline tabanlı kanat geometrileri elde edilmiştir.</p>',
        teknik: '<ul class="list-disc list-inside space-y-2 text-gray-300"><li><strong>Kullanılan Algoritmalar:</strong> Hess-Smith Panel Method, Prandtl-Glauert Compressibility Correction.</li><li><strong>Optimizasyon:</strong> MATLAB <code>fmincon</code> (SQP Algorithm) ile aerodinamik şekil optimizasyonu (Shape Optimization).</li><li><strong>Geometri Parametrizasyonu:</strong> Cubic Spline interpolation ve Polinom denklemleri.</li></ul>',
        gorsel: `
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                <div class="space-y-2 group sm:col-span-2">
                    <img src="assets/airfoil_poly.png" onclick="openLightbox(this.src)" title="Büyütmek için tıklayın" class="cursor-pointer rounded-xl w-full object-cover border border-gray-700 shadow-lg hover:border-brand-light hover:scale-[1.02] transition-all bg-white p-2">
                    <p class="text-sm font-medium text-center text-brand-light">Polynomial Parameterization Optimizasyonu (Kapak)</p>
                </div>
                <div class="space-y-2 group">
                    <img src="assets/cp_grafik.png" onclick="openLightbox(this.src)" title="Büyütmek için tıklayın" class="cursor-pointer rounded-xl w-full h-48 object-cover border border-gray-700 shadow-lg hover:border-brand-light hover:scale-[1.02] transition-all bg-white p-2">
                    <p class="text-sm font-medium text-center text-brand-light">Basınç Katsayısı (Cp) Dağılımı</p>
                </div>
                <div class="space-y-2 group">
                    <img src="assets/airfoil_spline.png" onclick="openLightbox(this.src)" title="Büyütmek için tıklayın" class="cursor-pointer rounded-xl w-full h-48 object-cover border border-gray-700 shadow-lg hover:border-brand-light hover:scale-[1.02] transition-all bg-white p-2">
                    <p class="text-sm font-medium text-center text-brand-light">Spline Tabanlı Optimizasyon Grafiği</p>
                </div>
            </div>
        `
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
    
    // Görseller
    const gorselTab = document.getElementById('tab-gorsel');
    if (data.gorsel) {
        gorselTab.innerHTML = data.gorsel;
    } else {
        gorselTab.innerHTML = '<div class="p-8 border-2 border-dashed border-gray-700 rounded-xl text-center text-gray-500"><i class="fas fa-image text-4xl mb-3"></i><p>Görseller buraya eklenebilir.</p></div>';
    }

    // Canlı Simülasyon Sekmesi
    const simBtn = document.getElementById('btn-sim');
    const simTab = document.getElementById('tab-sim');
    if (data.sim) {
        simTab.innerHTML = data.sim;
        simBtn.classList.remove('hidden');
        // Initial Calculation
        if (projectId === 'turbofan') {
            setTimeout(calculateTurbojet, 100);
        }
    } else {
        simTab.innerHTML = '';
        simBtn.classList.add('hidden');
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
        lightboxImg.src = ''; 
    }, 300);
}

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
