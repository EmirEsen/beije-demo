'use client';
import Link from 'next/link';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> This is Emir's Case for Beije </span>
              Welcome @beije-demo/frontend 👋
            </h1>
          </div>

          <div id="hero" className="rounded"
            style={{
              backgroundColor: '#b62229',
              padding: '32px',
              color: 'white'
            }}>
            <div className="text-container">
              <div style={{
                backgroundColor: '#fff3cd',
                border: '1px solid #ffeaa7',
                borderRadius: '6px',
                padding: '12px',
                marginBottom: '10px',
                fontSize: '12px',
                color: '#856404'
              }}>
                <strong>⚠️ Important:</strong> Please check the project startup instructions below to properly run all services with Docker and shared types.
              </div>
              <h2>
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                <span>You&apos;re up and running</span>
              </h2>

              <Link
                href="/custom-packet"
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  whiteSpace: 'nowrap',
                  fontSize: '16px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Let&apos;s see the custom packet page? →
              </Link>
            </div>
            <div className="logo-container">
              <svg
                width="120"
                height="120"
                viewBox="0 0 152 152"
                fill="none"
                role="img"
              >
                <path d="M152 76.7878C152 90.6136 144.479 101.953 137.737 113.09C130.867 124.44 122.396 133.154 110.629 139.711C99.3106 146.013 87.5544 152.941 73.6327 152.941C59.7109 152.941 45.4264 151.018 34.321 144.61C22.8742 138 12.8676 126.948 6.23208 115.545C-0.211403 104.482 1.18613 90.4648 1.18613 76.7878C1.18613 63.1108 -2.73973 47.5634 3.69309 36.3625C10.3073 24.8534 21.5834 13.0786 32.9875 6.33038C44.1249 -0.269024 59.8496 1.04873 73.6327 1.04873C87.4158 1.04873 98.3398 8.49829 109.691 14.9808C121.415 21.6758 133.854 27.0107 140.703 38.4773C147.434 49.7632 152 62.9726 152 76.7878Z" fill="#FFC906" />
              </svg>
            </div>
          </div>





          <div id="features" style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h3 style={{ color: '#b62229', marginBottom: '20px' }}>🚀 Project Features</h3>


            <div style={{ backgroundColor: '#e8f4fd', padding: '20px', borderRadius: '8px', border: '1px solid #b3d9ff' }}>
              <h3 style={{ color: '#b62229', marginBottom: '15px' }}>🐳 Docker Infrastructure</h3>
              <div style={{ backgroundColor: '#2d3748', color: '#e2e8f0', padding: '15px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '14px', marginBottom: '15px' }}>

                <div style={{ color: '#68d391' }}># Start MongoDB</div>
                <div>docker run -d --name mongodb -p 27017:27017 mongo:latest</div>

                <br />

                <div style={{ color: '#68d391' }}># Start RabbitMQ</div>
                <div>docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management</div>

              </div>
            </div>

            <div style={{ backgroundColor: '#f0f9ff', padding: '20px', borderRadius: '8px', border: '1px solid #bae6fd', marginTop: '20px' }}>
              <h3 style={{ color: '#b62229', marginBottom: '15px' }}>🚀 Start All Services</h3>
              <p style={{ marginBottom: '15px', color: '#374151' }}>Open 3 separate terminals and run:</p>
              <div style={{ backgroundColor: '#1f2937', color: '#f9fafb', padding: '15px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '14px' }}>
                <div style={{ color: '#68d391' }}># First, build shared types (required for all services)</div>
                <div style={{ marginBottom: '15px' }}>npx nx build @beije/shared</div>
                <br />
                <div style={{ color: '#68d391' }}>I've provided a seed service to insert demo data to the database</div>
                <div style={{ color: '#fbbf24' }}>Terminal 1 - Backend API: </div>
                <div style={{ marginBottom: '10px' }}>npx nx serve backend</div>
                <br />
                <div style={{ color: '#fbbf24' }}>Terminal 2 - Verification Service:</div>
                <div style={{ marginBottom: '10px' }}>npx nx serve verification-service</div>
                <br />
                <div style={{ color: '#fbbf24' }}>Terminal 3 - Frontend:</div>
                <div>npx nx serve frontend</div>
              </div>
            </div>
          </div>

          <p id="love">
            Carefully crafted with
            <svg
              fill="currentColor"
              stroke="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
            <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h4 style={{ color: '#b62229', margin: '0 0 10px 0' }}>✅ Frontend Stack</h4>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li>Next.js 15 with App Router</li>
                <li>Material-UI Components</li>
                <li>RTK Query API Integration</li>
                <li>Redux Global State Management</li>
                <li>TypeScript Shared Types</li>
              </ul>
            </div>
            <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h4 style={{ color: '#b62229', margin: '0 0 10px 0' }}>✅ Backend Stack</h4>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li>NestJS Microservices</li>
                <li>MongoDB Database</li>
                <li>RabbitMQ Message Queue</li>
                <li>Automated Database Seeding</li>
                <li>RESTful API Endpoints</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
