import React from 'react';
import { FaSeedling, FaHeart, FaUsers, FaAward, FaLeaf } from 'react-icons/fa';

const About = () => {
  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: '#333' }}>
            Hakkımızda
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
            Garden Çiçekçilik olarak, doğanın en güzel armağanlarını sizlere sunmaktan gurur duyuyoruz.
          </p>
        </div>

        {/* Hero Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
          color: 'white',
          padding: '60px 40px',
          borderRadius: '15px',
          marginBottom: '60px',
          textAlign: 'center'
        }}>
          <FaSeedling style={{ fontSize: '4rem', marginBottom: '20px' }} />
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
            Doğanın Güzelliklerini Evinize Taşıyoruz
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto' }}>
            2010 yılından bu yana, İstanbul'da çiçek tutkunlarına hizmet veriyoruz. 
            Her çiçeğimiz özenle seçilir ve özel bakımla yetiştirilir.
          </p>
        </div>

        {/* Values Section */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: '#333' }}>
            Değerlerimiz
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            <div className="card" style={{ textAlign: 'center', padding: '40px 30px' }}>
              <FaHeart style={{ fontSize: '3rem', color: '#4CAF50', marginBottom: '20px' }} />
              <h3 style={{ marginBottom: '15px', color: '#333' }}>Sevgi ile Yetiştiriyoruz</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Her çiçeğimiz sevgi ve özenle yetiştirilir. Doğanın en güzel armağanlarını 
                sizlere sunmak için çalışıyoruz.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '40px 30px' }}>
              <FaUsers style={{ fontSize: '3rem', color: '#4CAF50', marginBottom: '20px' }} />
              <h3 style={{ marginBottom: '15px', color: '#333' }}>Müşteri Memnuniyeti</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Müşterilerimizin memnuniyeti bizim için en önemli önceliktir. 
                Her siparişinizde en kaliteli hizmeti sunmaya çalışıyoruz.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '40px 30px' }}>
              <FaAward style={{ fontSize: '3rem', color: '#4CAF50', marginBottom: '20px' }} />
              <h3 style={{ marginBottom: '15px', color: '#333' }}>Kalite Garantisi</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Tüm ürünlerimiz kalite kontrolünden geçer. Taze ve sağlıklı çiçekler 
                garantisi veriyoruz.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div style={{ 
          background: '#f8f9fa', 
          padding: '60px 40px', 
          borderRadius: '15px',
          marginBottom: '60px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '30px', color: '#333' }}>
                Hikayemiz
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666', marginBottom: '20px' }}>
                2010 yılında küçük bir çiçek dükkanı olarak başladığımız yolculuğumuzda, 
                bugün İstanbul'un en güvenilir çiçekçilerinden biri haline geldik.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666', marginBottom: '20px' }}>
                Doğanın bize sunduğu en güzel armağanları, özel günlerinizde sevdiklerinize 
                ulaştırmak için çalışıyoruz. Her çiçeğimiz özenle seçilir ve özel bakımla yetiştirilir.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666' }}>
                Modern teknolojileri kullanarak, geleneksel çiçekçilik anlayışımızı 
                dijital dünyaya taşıdık. Artık çiçekleriniz sadece bir tık uzağınızda.
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <FaLeaf style={{ fontSize: '8rem', color: '#4CAF50', opacity: 0.3 }} />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: '#333' }}>
            Rakamlarla Biz
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#4CAF50', marginBottom: '10px' }}>
                14+
              </div>
              <div style={{ color: '#666' }}>Yıllık Deneyim</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#4CAF50', marginBottom: '10px' }}>
                10K+
              </div>
              <div style={{ color: '#666' }}>Mutlu Müşteri</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#4CAF50', marginBottom: '10px' }}>
                500+
              </div>
              <div style={{ color: '#666' }}>Çiçek Türü</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#4CAF50', marginBottom: '10px' }}>
                24/7
              </div>
              <div style={{ color: '#666' }}>Hizmet</div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: '#333' }}>
            Ekibimiz
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: '#4CAF50',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '3rem'
              }}>
                A
              </div>
              <h3 style={{ marginBottom: '10px', color: '#333' }}>Ahmet Yılmaz</h3>
              <p style={{ color: '#666', marginBottom: '15px' }}>Kurucu & CEO</p>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                14 yıllık çiçekçilik deneyimi ile şirketimizin kurucusu ve vizyoner lideri.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: '#4CAF50',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '3rem'
              }}>
                F
              </div>
              <h3 style={{ marginBottom: '10px', color: '#333' }}>Fatma Demir</h3>
              <p style={{ color: '#666', marginBottom: '15px' }}>Çiçek Uzmanı</p>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                Botanik eğitimi almış, çiçek düzenleme konusunda uzman ekibimizin değerli üyesi.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: '#4CAF50',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '3rem'
              }}>
                M
              </div>
              <h3 style={{ marginBottom: '10px', color: '#333' }}>Mehmet Kaya</h3>
              <p style={{ color: '#666', marginBottom: '15px' }}>Müşteri İlişkileri</p>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                Müşteri memnuniyetinden sorumlu, deneyimli müşteri ilişkileri uzmanımız.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 