// app/opengraph-image.tsx
import { ImageResponse } from 'next/og';
 
// Image metadata
export const alt = 'Rashid Mega Mart - Best Grocery Store in Rewa';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
 
// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFF9D8', // Theme background
          backgroundImage: 'radial-gradient(circle at 25px 25px, #800020 2%, transparent 0%), radial-gradient(circle at 75px 75px, #800020 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: '40px',
            padding: '60px 80px',
            boxShadow: '0 20px 40px rgba(128, 0, 32, 0.1)',
            border: '2px solid rgba(128, 0, 32, 0.1)',
          }}
        >
          {/* Logo ya Icon Placeholder */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '120px', 
            height: '120px', 
            backgroundColor: '#800020', 
            borderRadius: '30px',
            marginBottom: '30px'
          }}>
            <span style={{ color: 'white', fontSize: '60px', fontWeight: 'bold' }}>R</span>
          </div>

          <h1
            style={{
              fontSize: '80px',
              fontWeight: 900,
              color: '#800020',
              margin: 0,
              lineHeight: 1.1,
              textAlign: 'center',
              letterSpacing: '-0.02em',
            }}
          >
            Rashid Mega Mart
          </h1>
          
          <p
            style={{
              fontSize: '32px',
              color: '#A47A2C',
              marginTop: '20px',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Daily Needs, Delivered Fast in Rewa
          </p>

          <div style={{ 
            display: 'flex', 
            marginTop: '40px', 
            gap: '20px' 
          }}>
            <span style={{ 
              backgroundColor: '#138047', 
              color: 'white', 
              padding: '12px 24px', 
              borderRadius: '20px', 
              fontSize: '24px', 
              fontWeight: 'bold' 
            }}>
              ⚡ Fast Delivery
            </span>
            <span style={{ 
              backgroundColor: '#D4A84F', 
              color: 'white', 
              padding: '12px 24px', 
              borderRadius: '20px', 
              fontSize: '24px', 
              fontWeight: 'bold' 
            }}>
              🎁 Smart Saver Club
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}