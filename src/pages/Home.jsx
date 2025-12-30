/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Ai-propmt/src/pages/home.jsx

import React, { useState } from 'react'
import Navbar from "../Component/Navbar.jsx";
import Select from 'react-select';
import { BsStars } from 'react-icons/bs';
import { HiOutlineCode } from 'react-icons/hi';
import Editor from '@monaco-editor/react';
import { IoCloseSharp, IoCopy } from 'react-icons/io5';
import { PiExportBold } from 'react-icons/pi';
import { ImNewTab } from 'react-icons/im';
import { FiRefreshCcw } from 'react-icons/fi';
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';


const Home = () => {


  const options = [
    { value: 'html-css', label: 'HTML + CSS' },
    { value: 'html-tailwind', label: 'HTML + Tailwind CSS' },
    { value: 'html-bootstrap', label: 'HTML + Bootstrap' },
    { value: 'html-css-js', label: 'HTML + CSS + JS' },
    { value: 'html-tailwind-bootstrap', label: 'HTML + Tailwind + Bootstrap' },
  ];

  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [frameWork, setFrameWork] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNewTabOpen, setIsNewTabOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);


  function extractCode(response) {
    const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  }


  const ai = new GoogleGenAI({
    apiKey:"YOUR API KEY"
  });

  <section class="relative bg-[url('https://images.unsplash.com/photo-1549880338-72b9a791a877?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center h-screen flex items-center justify-center p-4 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 opacity-80"></div>

    <div class="relative z-10 text-white text-center max-w-4xl mx-auto px-4">
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-shadow-outline animate-fade-in">
        Unlock Your Potential with Our Innovative Solutions
      </h1>

      <p class="text-lg sm:text-xl md:text-2xl mb-8 font-light text-shadow-outline animate-fade-in-delay-1">
        Experience cutting-edge technology designed to elevate your business and simplify your life.
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-delay-2">
        <a href="#learn-more" class="inline-block px-10 py-4 rounded-full font-bold text-lg text-white shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl btn-gradient-primary focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50">
          Learn More
        </a>
        <a href="#contact-us" class="inline-block px-10 py-4 rounded-full font-bold text-lg bg-transparent border-2 border-white text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-white hover:text-indigo-700 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50">
          Contact Us
        </a>
      </div>
    </div>
  </section>

  async function getResponse() {
    if (!prompt.trim()) return toast.error("Please describe your component first");

    try {
      setLoading(true);
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
     You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components. You are highly skilled in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React, Next.js, Vue.js, Angular, and more.

Now, generate a UI component for: ${prompt}  
Framework to use: ${frameWork.value}  

Requirements:  
- The code must be clean, well-structured, and easy to understand.  
- Optimize for SEO where applicable.  
- Focus on creating a modern, animated, and responsive UI design.  
- Include high-quality hover effects, shadows, animations, colors, and typography.  
- Return ONLY the code, formatted properly in **Markdown fenced code blocks**.  
- Do NOT include explanations, text, comments, or anything else besides the code.  
- And give the whole code in a single HTML file.
      `,
      });

      setCode(extractCode(response.text));
      setOutputScreen(true);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while generating code");
    } finally {
      setLoading(false);
    }
  };


  const copyCode = async () => {
    if (!code.trim()) return toast.error("No code to copy");
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard");
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast.error("Failed to copy");
    }
  };


  const downnloadFile = () => {
    if (!code.trim()) return toast.error("No code to download");

    const fileName = "GenUI-Code.html"
    const blob = new Blob([code], { type: 'text/plain' });
    let url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("File downloaded");
  };

  return (
    <>
      <Navbar />
      <div className='flex items-center px-100 gap-[30px] justify-between'>
        <div className='left w-[50%] h-[80vh] bg-zinc-800 mt-5 p-[20px] space-y-6'>
          <h1 className='text-[30px]  font-semibold sptext gap-[20px]'>AI component generator</h1>
          <p className='text-[grey] wt-2 text-[16px]'>Describe your component and let AI generate it for component.</p>
          <p className='text-[20px] font-[700] mt-4'>Framework</p>
          <Select className='mt-2'
            options={options}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#111",
                borderColor: "#333",
                color: "#fff",
                boxShadow: "none",
                "&:hover": { borderColor: "#555" }
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#111",
                color: "#fff"
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#333"
                  : state.isFocused
                    ? "#222"
                    : "#111",
                color: "#fff",
                "&:active": { backgroundColor: "#444" }
              }),
              singleValue: (base) => ({ ...base, color: "#fff" }),
              placeholder: (base) => ({ ...base, color: "#aaa" }),
              input: (base) => ({ ...base, color: "#fff" })
            }}
            value={options.find(o => o.value === frameWork.value)}
            onChange={(e) => setFrameWork(e.value)}
            placeholder="Select component"
          />
          <p className='text-[20px] font-[700] mt-5'> Describe your component</p>
          <textarea onChange={(e) => setPrompt(e.target.value)} value={prompt}
            className='w-full h-[50%] rounded-xl bg-[#090908]  mt-left-3px mt-3 p-7'
            placeholder='Describe your component in detail and let AI will code for you'
          />
          <div className="flex justify-end">
            <button onClick={(getResponse)}
              type="button"
              aria-label="Generate component"
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold ml-auto min-w-[140px] focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-center "
            >
              <i><BsStars /></i>
              Generate
            </button>
          </div>
        </div>
        <div className='right relative w-[50%] mt-2 h-[80vh] bg-zinc-800 rounded-xl'>
          {
            !outputScreen ? (
              loading ? (
                <div className='loader absolute left-0 top-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)]'>
                  <ClipLoader color="#8b5cf6" loading={true} size={48} />
                </div>
              ) : (
                <div className='skeleton w-full h-full flex items-center flex-col justify-center'>
                  <div className='circle w-[70px] h-[70px] text-[17px] rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center'><HiOutlineCode /></div>
                  <p className='text-[16px] text-[#898282] mt-3'>Generated code will appear here</p>
                </div>
              )
            ) : (
              <>
                <div className='top w-full bg-[#1223] h-[60px] flex items-center px-[20px] gap-15'>
                  <button onClick={() => { setTab(1) }} className={'flex-1 h-10 text-20px rounded-full text-bold font-medium text-white transition ' + (tab === 1 ? 'bg-[#333]' : '')}>
                    Code
                  </button>

                  <button onClick={() => { setTab(2) }} className={'flex-1 h-10 text-20px rounded-full text-bold font-medium text-white transition ' + (tab === 2 ? 'bg-[#333]' : '')}>
                    Preview
                  </button>
                </div>
                <div className='top-second top w-full bg-[#1223] h-[60px] flex items-center justify-between px-[20px] gap-15px'>
                  <div className='left'>
                    <p className='font-bold'>Code Editor</p>
                  </div>
                  <div className='right flex items-center gap-[10px]'>
                    {tab === 1 ? (
                      <>
                        <button aria-label='Copy code' onClick={copyCode} className='w-[40px] h-[40px] bg-[#333] rounded-xl border border-zinc-800 flex items-center justify-center transition-all hover:bg-[#444]'>
                          <IoCopy />
                        </button>
                        <button aria-label='Download code' onClick={downnloadFile} className='w-[40px] h-[40px] bg-[#333] rounded-xl border border-zinc-800 flex items-center justify-center transition-all hover:bg-[#444]'>
                          <PiExportBold />
                        </button>
                      </>
                    ) : (
                      <>
                        <button aria-label='Open in new tab' className='w-[40px] h-[40px] bg-[#333] rounded-xl border border-zinc-800 flex items-center justify-center transition-all hover:bg-[#444]'>
                          <ImNewTab />
                        </button>
                        <button aria-label='Refresh' onClick={() => setRefreshKey(prev => prev + 1)} className='w-[40px] h-[40px] bg-[#333] rounded-xl border border-zinc-800 flex items-center justify-center transition-all hover:bg-[#444]'>
                          <FiRefreshCcw />
                        </button>
                      </>
                    )}
                  </div>

                </div>
                <div className='editor h-full'>

                  {tab === 1 ? (
                    <Editor height="100%" theme="vs-dark" defaultLanguage="html" value={code} />
                  ) : (
                    <div className='preview bg-white text-black w-full h-full flex items-center justify-center'>
                      {/* preview area */}
                      <iframe key={refreshKey} srcDoc={code} className="w-full h-full bg-white text-black"></iframe>
                    </div>
                  )}

                </div>
              </>
            )
          }
        </div>
      </div>

      {/* ✅ Fullscreen Preview Overlay */}
      {isNewTabOpen && (
        <div className="absolute inset-0 bg-white w-screen h-screen overflow-auto">
          <div className="text-black w-full h-[60px] flex items-center justify-between px-5 bg-gray-100">
            <p className='font-bold'>Preview</p>
            <button onClick={() => setIsNewTabOpen(false)} className="w-10 h-10 rounded-xl border border-zinc-300 flex items-center justify-center hover:bg-gray-200">
              <IoCloseSharp />
            </button>
          </div>
          <iframe srcDoc={code} className="w-full h-[calc(100vh-60px)]"></iframe>
        </div>
      )}
    </>
  )
}

export default Home;
