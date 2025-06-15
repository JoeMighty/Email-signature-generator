import React, { useState, useRef } from 'react';
import './App.css';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

const SignatureCreator = () => {
  const [userData, setUserData] = useState({
    name: '',
    position: '',
    company: '',
    phone: '',
  });
  
  const [selectedStyle, setSelectedStyle] = useState('creative');
  const [avatar, setAvatar] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);
  
  const signatureRef = useRef(null);

  const styles = [
    { id: 'creative', name: 'Creative', color: 'from-pink-500 to-orange-400' },
    { id: 'tech', name: 'Tech', color: 'from-blue-500 to-cyan-400' },
    { id: 'minimalist', name: 'Minimalist', color: 'from-gray-600 to-gray-400' },
    { id: 'modernist', name: 'Modernist', color: 'from-purple-500 to-indigo-400' },
    { id: 'oldFashion', name: 'Old Fashion', color: 'from-amber-600 to-yellow-400' },
    { id: 'colourful', name: 'Colourful', color: 'from-green-500 to-teal-400' }
  ];

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (type === 'avatar') {
          setAvatar(event.target.result);
        } else {
          setCompanyLogo(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const generateHTML = () => {
    if (!signatureRef.current) return '';
    return signatureRef.current.outerHTML;
  };

  const generatePNG = async () => {
    if (!signatureRef.current) return;
    
    try {
      const canvas = await html2canvas(signatureRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      canvas.toBlob((blob) => {
        saveAs(blob, 'email-signature.png');
      });
    } catch (error) {
      console.error('Error generating PNG:', error);
    }
  };

  const copyHTML = () => {
    const html = generateHTML();
    navigator.clipboard.writeText(html);
    alert('HTML signature copied to clipboard!');
  };

  const getSignatureStyle = () => {
    const baseStyle = "max-w-md mx-auto p-4 font-sans";
    
    switch (selectedStyle) {
      case 'creative':
        return `${baseStyle} bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl border-l-4 border-pink-500`;
      case 'tech':
        return `${baseStyle} bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200`;
      case 'minimalist':
        return `${baseStyle} bg-white border-l-2 border-gray-300`;
      case 'modernist':
        return `${baseStyle} bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200`;
      case 'oldFashion':
        return `${baseStyle} bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-md`;
      case 'colourful':
        return `${baseStyle} bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl border-2 border-green-400`;
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    switch (selectedStyle) {
      case 'creative':
        return { name: 'text-2xl font-bold text-pink-600', position: 'text-sm text-orange-600', company: 'text-lg font-semibold text-pink-500', phone: 'text-sm text-gray-600' };
      case 'tech':
        return { name: 'text-xl font-bold text-blue-700', position: 'text-sm text-cyan-600', company: 'text-lg font-semibold text-blue-600', phone: 'text-sm text-gray-600' };
      case 'minimalist':
        return { name: 'text-xl font-light text-gray-800', position: 'text-sm text-gray-600', company: 'text-base text-gray-700', phone: 'text-sm text-gray-500' };
      case 'modernist':
        return { name: 'text-xl font-bold text-purple-700', position: 'text-sm text-indigo-600', company: 'text-lg font-semibold text-purple-600', phone: 'text-sm text-gray-600' };
      case 'oldFashion':
        return { name: 'text-xl font-serif font-bold text-amber-800', position: 'text-sm text-yellow-700', company: 'text-lg font-serif text-amber-700', phone: 'text-sm text-gray-600' };
      case 'colourful':
        return { name: 'text-xl font-bold text-green-700', position: 'text-sm text-teal-600', company: 'text-lg font-semibold text-green-600', phone: 'text-sm text-gray-600' };
      default:
        return { name: 'text-xl font-bold', position: 'text-sm', company: 'text-lg', phone: 'text-sm' };
    }
  };

  const textStyles = getTextStyle();

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">✨ Email Signature Creator</h1>
          <p className="text-purple-100">Create professional signatures in HTML & PNG formats</p>
        </div>

        {/* Bento Box Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Input Form - Left Side */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Personal Info Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 w-2 h-6 rounded-full mr-3"></span>
                Personal Info
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <input
                  type="text"
                  name="position"
                  placeholder="Job Position"
                  value={userData.position}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={userData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={userData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
            </div>

            {/* Image Uploads Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 w-2 h-6 rounded-full mr-3"></span>
                Images
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Avatar</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'avatar')}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label htmlFor="avatar-upload" className="cursor-pointer block w-full">
                    <div className="border-2 border-dashed border-white/40 rounded-xl p-4 text-center hover:border-pink-400 transition-colors">
                      {avatar ? (
                        <img src={avatar} alt="Avatar" className="w-16 h-16 rounded-full mx-auto object-cover" />
                      ) : (
                        <div className="text-white/70">
                          <div className="text-2xl mb-1">👤</div>
                          <div className="text-xs">Upload Avatar</div>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Company Logo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'companyLogo')}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label htmlFor="logo-upload" className="cursor-pointer block w-full">
                    <div className="border-2 border-dashed border-white/40 rounded-xl p-4 text-center hover:border-cyan-400 transition-colors">
                      {companyLogo ? (
                        <img src={companyLogo} alt="Logo" className="w-16 h-16 mx-auto object-contain" />
                      ) : (
                        <div className="text-white/70">
                          <div className="text-2xl mb-1">🏢</div>
                          <div className="text-xs">Upload Logo</div>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Style Selector Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 w-2 h-6 rounded-full mr-3"></span>
                Signature Style
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all ${
                      selectedStyle === style.id
                        ? 'bg-white text-purple-600 scale-105 shadow-lg'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <div className={`w-full h-2 rounded-full bg-gradient-to-r ${style.color} mb-2`}></div>
                    {style.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview & Download - Right Side */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Preview Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 h-fit">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="bg-gradient-to-r from-rose-400 to-pink-500 w-2 h-6 rounded-full mr-3"></span>
                Live Preview
              </h2>
              
              <div className="bg-white rounded-xl p-6 min-h-[200px] flex items-center justify-center">
                {userData.name || userData.position || userData.company || userData.phone ? (
                  <div ref={signatureRef} className={getSignatureStyle()}>
                    <div className="flex items-start gap-4">
                      {avatar && (
                        <img 
                          src={avatar} 
                          alt="Avatar" 
                          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                        />
                      )}
                      
                      <div className="flex-1">
                        {userData.name && (
                          <div className={textStyles.name}>{userData.name}</div>
                        )}
                        {userData.position && (
                          <div className={textStyles.position}>{userData.position}</div>
                        )}
                        {userData.company && (
                          <div className={`${textStyles.company} mt-2`}>{userData.company}</div>
                        )}
                        {userData.phone && (
                          <div className={`${textStyles.phone} mt-1`}>📞 {userData.phone}</div>
                        )}
                      </div>
                      
                      {companyLogo && (
                        <img 
                          src={companyLogo} 
                          alt="Company Logo" 
                          className="w-12 h-12 object-contain flex-shrink-0"
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400">
                    <div className="text-4xl mb-2">✍️</div>
                    <p>Start filling in your details to see the preview</p>
                  </div>
                )}
              </div>
            </div>

            {/* Download Actions Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="bg-gradient-to-r from-emerald-400 to-teal-500 w-2 h-6 rounded-full mr-3"></span>
                Download Options
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={copyHTML}
                  disabled={!userData.name && !userData.position && !userData.company && !userData.phone}
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  <div className="text-2xl mb-1">📋</div>
                  Copy HTML
                </button>
                
                <button
                  onClick={generatePNG}
                  disabled={!userData.name && !userData.position && !userData.company && !userData.phone}
                  className="bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  <div className="text-2xl mb-1">🖼️</div>
                  Download PNG
                </button>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-white/70 text-sm">
                  HTML for email clients • PNG for social media & documents
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <SignatureCreator />
    </div>
  );
}

export default App;