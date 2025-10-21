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
        </div>
      </div>
    </div>
  );
}
