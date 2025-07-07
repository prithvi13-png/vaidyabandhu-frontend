import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { Phone, MapPin } from 'lucide-react';

const DiagnosticCentersList = () => {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animated, setAnimated] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCenterId, setSelectedCenterId] = useState(null);
  const [db, setDb] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    try {
      const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
      const app = initializeApp(firebaseConfig);
      const firestore = getFirestore(app);
      const firebaseAuth = getAuth(app);
      setDb(firestore);

      const initialAuth = async () => {
        try {
          if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
            await signInWithCustomToken(firebaseAuth, __initial_auth_token);
          } else {
            await signInAnonymously(firebaseAuth);
          }
        } catch (e) {
          console.error("Firebase authentication error:", e);
          setError("Failed to authenticate with Firebase.");
        }
      };
      initialAuth();

      const unsubscribeAuth = onAuthStateChanged(firebaseAuth, () => {
        setIsAuthReady(true);
      });

      return () => unsubscribeAuth();
    } catch (e) {
      console.error("Firebase initialization error:", e);
      setError("Failed to initialize Firebase. Check config.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (db && isAuthReady) {
      setLoading(true);
      setError(null);
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const centersCollectionRef = collection(db, `artifacts/${appId}/public/data/diagnosticCenters`);

      const unsubscribe = onSnapshot(
        centersCollectionRef,
        (snapshot) => {
          const centersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          centersList.sort((a, b) => a.name.localeCompare(b.name));
          setCenters(centersList);
          setLoading(false);
          setAnimated(true);
        },
        (err) => {
          console.error("Error fetching diagnostic centers:", err);
          setError("Failed to load diagnostic centers. Check Firestore rules. Error: " + err.message);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    }
  }, [db, isAuthReady]);

  const baseTransition = "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px', fontSize: '20px', color: '#007a7e' }}>Loading diagnostic centers...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '50px', fontSize: '20px', color: '#e74c3c' }}>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '80px 20px', background: 'linear-gradient(135deg, #f5fdfd 0%, #e0f7fa 100%)' }}>
      <div style={{ maxWidth: '100%', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 40px)', fontWeight: 800, color: '#004d4f', textAlign: 'center', marginBottom: '40px' }}>
          Our Diagnostic <span style={{ color: '#007a7e' }}>Centers</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {centers.length === 0 ? (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1', fontSize: '18px', color: '#5a6778' }}>
              No diagnostic centers found.
            </p>
          ) : (
            centers.map((center, i) => (
              <div
                key={center.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  boxShadow: hoveredCard === center.id ? '0 18px 40px rgba(0, 122, 126, 0.2)' : '0 8px 20px rgba(0, 122, 126, 0.08)',
                  padding: '30px',
                  transition: baseTransition,
                  opacity: animated ? 1 : 0,
                  transform: animated ? "translateY(0)" : "translateY(40px)",
                  transitionDelay: `${0.2 + i * 0.1}s`,
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setHoveredCard(center.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedCenterId(center.id)}
              >
                <h5 style={{ fontSize: 'clamp(22px, 2.8vw, 26px)', fontWeight: '700', color: '#004d4f', marginBottom: '10px' }}>{center.name}</h5>
                <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: '#5a6778', display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <Phone size={18} style={{ marginRight: '10px', color: '#007a7e' }} />
                  {center.contact}
                </p>
                <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: '#5a6778', display: 'flex', alignItems: 'flex-start', marginBottom: '0' }}>
                  <MapPin size={18} style={{ marginRight: '10px', color: '#007a7e', marginTop: '3px' }} />
                  {center.address}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DiagnosticCentersList;
