import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';

export default function Register() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: User Account
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Step 2: Business Account
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('Fashion');
  const [whatsapp, setWhatsapp] = useState('');
  const [currency, setCurrency] = useState('LKR (Rs.)');

  const { session, businessId, refreshBusinessId } = useAuth();

  // If already logged in AND has business, skip to dashboard. 
  // If logged in but NO business, force step 2.
  React.useEffect(() => {
    if (session) {
      if (businessId) {
        navigate('/');
      } else {
        setStep(2);
      }
    }
  }, [session, businessId, navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (signUpError) throw signUpError;
      
      // The user is registered, session is established automatically in many cases
      setStep(2);
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data: authData } = await supabase.auth.getUser();
      const user = authData.user;
      if (!user) throw new Error('Not authenticated. Please try logging in again.');

      // Generate the ID client-side so we don't need to use .select() which triggers the RLS SELECT policy
      // before the profile is linked.
      const newBusinessId = crypto.randomUUID();

      // 1. Create Business
      const { error: bizError } = await supabase
        .from('businesses')
        .insert({
          id: newBusinessId,
          name: businessName,
          category,
          whatsapp_number: whatsapp,
          currency,
        }); // no .select() here!

      if (bizError) throw bizError;

      // 2. Update Profile with business ID
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          business_id: newBusinessId,
          full_name: fullName || user.user_metadata?.full_name || 'Owner',
        });

      if (profileError) {
        // If it already exists (e.g., trigger created it), just update
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ business_id: newBusinessId })
          .eq('id', user.id);
        
        if (updateError) throw updateError;
      }

      // 3. Force the AuthContext to fetch the new businessId
      await refreshBusinessId();
      
      // App.tsx routing will automatically take them to '/' now
      navigate('/');
      
    } catch (err: any) {
      console.error('Setup error:', err);
      setError(err.message || 'Failed to complete setup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          {step === 1 ? 'Create your account' : 'Welcome to Yeqari Commerce'}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          {step === 1 ? (
            <>
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-brand-600 hover:text-brand-500">
                Sign in
              </Link>
            </>
          ) : (
            'Let\'s set up your business.'
          )}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          
          {error && (
            <div className="mb-4 bg-red-50 p-3 rounded text-red-600 text-sm border border-red-100">
              {error}
            </div>
          )}

          {step === 1 ? (
            <form className="space-y-6" onSubmit={handleRegister}>
              <div>
                <label className="block text-sm font-medium text-slate-700">Full Name</label>
                <div className="mt-1">
                  <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)} className="input-field" placeholder="John Doe" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Email address</label>
                <div className="mt-1">
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="input-field" placeholder="john@example.com" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <div className="mt-1">
                  <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="input-field" />
                </div>
              </div>

              <div>
                <button type="submit" disabled={isLoading} className="w-full btn-primary py-2.5 flex justify-center">
                  {isLoading ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleOnboarding}>
              <div>
                <label className="block text-sm font-medium text-slate-700">Business Name</label>
                <div className="mt-1">
                  <input type="text" required value={businessName} onChange={e => setBusinessName(e.target.value)} className="input-field" placeholder="My Fashion Store" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Business Category</label>
                <div className="mt-1">
                  <select value={category} onChange={e => setCategory(e.target.value)} className="input-field">
                    <option>Fashion</option>
                    <option>Home Decor</option>
                    <option>Bakery</option>
                    <option>Jewellery</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">WhatsApp Number</label>
                <div className="mt-1">
                  <input type="tel" required value={whatsapp} onChange={e => setWhatsapp(e.target.value)} className="input-field" placeholder="+94 77 123 4567" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Currency</label>
                <div className="mt-1">
                  <select value={currency} onChange={e => setCurrency(e.target.value)} className="input-field">
                    <option>LKR (Rs.)</option>
                    <option>USD ($)</option>
                  </select>
                </div>
              </div>

              <div>
                <button type="submit" disabled={isLoading} className="w-full btn-primary py-2.5 flex justify-center text-lg shadow-sm">
                  {isLoading ? 'Saving...' : 'Complete Setup'}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
