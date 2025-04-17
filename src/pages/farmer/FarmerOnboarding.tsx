
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight, Check, Upload, FileText } from 'lucide-react';

const steps = [
  { id: 1, title: 'Farm Information' },
  { id: 2, title: 'Identity Verification' },
  { id: 3, title: 'Terms & Policies' },
  { id: 4, title: 'Complete' }
];

const FarmerOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    farmName: '',
    farmAddress: '',
    farmCity: '',
    farmState: '',
    farmSize: '',
    farmType: '',
    producesTypes: [],
    idType: 'aadhar',
    idNumber: '',
    idFrontImage: null,
    idBackImage: null,
    farmPhoto: null,
    agreeTerms: false,
    agreePrivacy: false,
    agreeSelling: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleFinish = () => {
    // In a real app, you'd submit the form data to your backend
    console.log('Form data submitted:', formData);
    navigate('/farmer/dashboard');
  };

  return (
    <div className="min-h-screen bg-farmandi-cream flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-6">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Farmandi" className="h-10 w-10" />
            <div>
              <h1 className="text-farmandi-green-dark font-bold text-xl">Farmandi</h1>
              <p className="text-xs text-farmandi-brown-light">Connecting farmers directly to customers</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                {index > 0 && (
                  <div 
                    className={`flex-grow border-t-2 ${
                      currentStep > index ? 'border-farmandi-green' : 'border-gray-200'
                    }`}
                  />
                )}
                <div className="relative flex flex-col items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep > step.id 
                        ? 'bg-farmandi-green text-white' 
                        : currentStep === step.id 
                        ? 'bg-farmandi-green/10 text-farmandi-green border-2 border-farmandi-green' 
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {currentStep > step.id ? <Check size={16} /> : step.id}
                  </div>
                  <span 
                    className={`absolute -bottom-6 text-xs whitespace-nowrap ${
                      currentStep === step.id ? 'text-farmandi-green font-medium' : 'text-gray-500'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-grow py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            {/* Step 1: Farm Information */}
            {currentStep === 1 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-farmandi-brown mb-6">Farm Information</h2>
                <p className="text-gray-600 mb-8">
                  Please provide details about your farm to help customers learn more about where their food comes from.
                </p>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="farmName">Farm Name</Label>
                    <Input 
                      id="farmName"
                      name="farmName"
                      value={formData.farmName}
                      onChange={handleChange}
                      placeholder="Your farm's name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="farmAddress">Farm Address</Label>
                    <Input 
                      id="farmAddress"
                      name="farmAddress"
                      value={formData.farmAddress}
                      onChange={handleChange}
                      placeholder="Street address"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="farmCity">City</Label>
                      <Input 
                        id="farmCity"
                        name="farmCity"
                        value={formData.farmCity}
                        onChange={handleChange}
                        placeholder="City"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="farmState">State</Label>
                      <select
                        id="farmState"
                        name="farmState"
                        value={formData.farmState}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="">Select State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="West Bengal">West Bengal</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="farmSize">Farm Size (in acres)</Label>
                      <Input 
                        id="farmSize"
                        name="farmSize"
                        type="number"
                        value={formData.farmSize}
                        onChange={handleChange}
                        placeholder="Farm size"
                        min="0"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="farmType">Farm Type</Label>
                      <select
                        id="farmType"
                        name="farmType"
                        value={formData.farmType}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="Organic">Organic</option>
                        <option value="Conventional">Conventional</option>
                        <option value="Mixed">Mixed Farming</option>
                        <option value="Permaculture">Permaculture</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>What do you produce?</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {['Vegetables', 'Fruits', 'Grains', 'Dairy', 'Poultry', 'Other'].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`produce-${type}`}
                            checked={formData.producesTypes.includes(type)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData(prev => ({
                                  ...prev,
                                  producesTypes: [...prev.producesTypes, type]
                                }));
                              } else {
                                setFormData(prev => ({
                                  ...prev,
                                  producesTypes: prev.producesTypes.filter(t => t !== type)
                                }));
                              }
                            }}
                          />
                          <label 
                            htmlFor={`produce-${type}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Identity Verification */}
            {currentStep === 2 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-farmandi-brown mb-6">Identity Verification</h2>
                <p className="text-gray-600 mb-8">
                  To ensure the security of our marketplace, we need to verify your identity. 
                  All information is securely stored and protected.
                </p>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="idType">ID Type</Label>
                    <select
                      id="idType"
                      name="idType"
                      value={formData.idType}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="aadhar">Aadhar Card</option>
                      <option value="pan">PAN Card</option>
                      <option value="voter">Voter ID</option>
                      <option value="driving">Driving License</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idNumber">ID Number</Label>
                    <Input 
                      id="idNumber"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleChange}
                      placeholder="Enter your ID number"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="idFrontImage">Upload ID Front</Label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="idFrontImage"
                              className="relative cursor-pointer rounded-md font-medium text-farmandi-green hover:text-farmandi-green-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-farmandi-green"
                            >
                              <span>Upload a file</span>
                              <input id="idFrontImage" name="idFrontImage" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, JPEG up to 5MB
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="idBackImage">Upload ID Back</Label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="idBackImage"
                              className="relative cursor-pointer rounded-md font-medium text-farmandi-green hover:text-farmandi-green-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-farmandi-green"
                            >
                              <span>Upload a file</span>
                              <input id="idBackImage" name="idBackImage" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, JPEG up to 5MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="farmPhoto">Upload a Photo of Your Farm (Optional)</Label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="farmPhoto"
                            className="relative cursor-pointer rounded-md font-medium text-farmandi-green hover:text-farmandi-green-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-farmandi-green"
                          >
                            <span>Upload a file</span>
                            <input id="farmPhoto" name="farmPhoto" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, JPEG up to 10MB
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Adding photos of your farm helps build trust with customers.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Terms & Policies */}
            {currentStep === 3 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-farmandi-brown mb-6">Terms & Policies</h2>
                <p className="text-gray-600 mb-8">
                  Please review and agree to our terms and policies before proceeding.
                </p>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="flex items-start space-x-3 mb-4">
                      <FileText className="h-6 w-6 text-farmandi-green flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg text-farmandi-green">Terms of Service</h3>
                        <p className="text-sm text-gray-600">
                          Summary of key points in our terms of service for farmers:
                        </p>
                      </div>
                    </div>
                    
                    <ul className="list-disc pl-12 space-y-2 text-sm text-gray-600 mb-6">
                      <li>You must provide accurate information about your farm and products.</li>
                      <li>You agree to maintain quality standards for all products sold on Farmandi.</li>
                      <li>Commissions of 7% are charged on each sale through the platform.</li>
                      <li>Payment processing takes 3-5 business days after delivery confirmation.</li>
                      <li>You are responsible for the accuracy of product descriptions and pricing.</li>
                    </ul>
                    
                    <div className="text-center">
                      <a href="#" className="text-farmandi-green text-sm hover:underline">
                        Read full Terms of Service
                      </a>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="agreeTerms" 
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => handleCheckboxChange('agreeTerms', checked as boolean)}
                        required
                      />
                      <label 
                        htmlFor="agreeTerms" 
                        className="text-sm font-normal"
                      >
                        I agree to the <a href="#" className="text-farmandi-green hover:underline">Terms of Service</a>
                      </label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="agreePrivacy" 
                        checked={formData.agreePrivacy}
                        onCheckedChange={(checked) => handleCheckboxChange('agreePrivacy', checked as boolean)}
                        required
                      />
                      <label 
                        htmlFor="agreePrivacy" 
                        className="text-sm font-normal"
                      >
                        I agree to the <a href="#" className="text-farmandi-green hover:underline">Privacy Policy</a>
                      </label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="agreeSelling" 
                        checked={formData.agreeSelling}
                        onCheckedChange={(checked) => handleCheckboxChange('agreeSelling', checked as boolean)}
                        required
                      />
                      <label 
                        htmlFor="agreeSelling" 
                        className="text-sm font-normal"
                      >
                        I agree to abide by Farmandi's <a href="#" className="text-farmandi-green hover:underline">Seller Guidelines</a> and quality standards
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Complete */}
            {currentStep === 4 && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-farmandi-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-farmandi-green mb-4">Registration Complete!</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Thank you for registering as a farmer on Farmandi. Your account is now pending verification. 
                  We'll review your information and get back to you within 24-48 hours.
                </p>
                <div className="bg-farmandi-green/10 p-6 rounded-lg border border-farmandi-green/20 mb-8">
                  <h3 className="font-semibold text-farmandi-green mb-2">Next Steps</h3>
                  <ol className="list-decimal text-left pl-6 space-y-2 text-gray-600">
                    <li>Verify your email address through the link we sent you</li>
                    <li>Complete your farm profile with additional details</li>
                    <li>Add your bank account details to receive payments</li>
                    <li>Start listing your products once your account is verified</li>
                  </ol>
                </div>
                <Button variant="farmer" size="lg" onClick={handleFinish}>
                  Go to Dashboard
                </Button>
              </div>
            )}

            {/* Form Navigation */}
            {currentStep < 4 && (
              <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
                <Button
                  type="button"
                  variant="farmer"
                  onClick={handleNext}
                >
                  {currentStep === 3 ? 'Submit' : 'Next'} <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 bg-white border-t border-gray-200 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Farmandi. All rights reserved.
      </footer>
    </div>
  );
};

export default FarmerOnboarding;
