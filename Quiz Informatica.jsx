npm install jspdf

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Download } from 'lucide-react';
import jsPDF from 'jspdf';

const QuizApp = () => {
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const allQuestions = [
    {
      question: "Qual è la funzione principale del microprocessore (CPU) in un computer?",
      options: ["Elaborare i dati seguendo istruzioni.", "Gestire la memoria RAM e i moduli di input/output.", "Fornire la GUI (Graphical User Interface) all'utente.", "Memorizzare i dati in modo permanente."],
      correct: 0
    },
    {
      question: "Qual è la caratteristica distintiva della memoria RAM (Random Access Memory) rispetto alla memoria di massa?",
      options: ["È una memoria di lavoro dinamica e volatile che mantiene istruzioni e dati durante l'elaborazione.", "È una memoria permanente che contiene il nucleo del sistema operativo.", "È un dispositivo di output che consente di visualizzare i dati elaborati.", "È una memoria che si misura esclusivamente in Bit per secondo (bps)."],
      correct: 0
    },
    {
      question: "Cosa si intende per Hardware?",
      options: ["L'insieme dei componenti fisici (meccanici, elettrici, elettronici) che costituiscono l'elaboratore.", "L'insieme di programmi e istruzioni necessari per svolgere compiti specifici (software).", "La scienza che studia i modi per rappresentare ed elaborare l'informazione (informatica).", "Il protocollo di comunicazione utilizzato tra la CPU e i bus."],
      correct: 0
    },
    {
      question: "Nel contesto dell'informatica e della codifica dei dati, cosa rappresenta il Bit?",
      options: ["La quantità minima di informazione che può assumere i due valori 0 o 1.", "Il Byte, l'unità minima di memorizzazione e lettura in un elaboratore.", "Un gruppo di 8 Byte utilizzato per codificare un simbolo.", "Una cifra esadecimale utilizzata nella codifica delle istruzioni."],
      correct: 0
    },
    {
      question: "Qual è la relazione corretta tra Bit e Byte?",
      options: ["Un Byte è un gruppo di 8 Bit e può codificare 256 simboli distinti.", "Un Byte è un gruppo di 1024 Bit.", "Bit e Byte sono sinonimi usati per misurare la frequenza del processore.", "Il Bit si usa per misurare lo spazio di archiviazione in GB, mentre il Byte è usato solo per la velocità di trasferimento (bps)."],
      correct: 0
    },
    {
      question: "Il Cloud Computing è definito come:",
      options: ["Un insieme di tecnologie attraverso le quali un provider fornisce servizi e risorse hardware/software distribuite in rete.", "Un servizio che permette l'archiviazione locale di file di grandi dimensioni.", "L'uso esclusivo di software di produttività online, come Google Docs o Office Online.", "La tecnologia che permette di eseguire applicazioni complete all'interno del browser (Web app) in assenza di una rete."],
      correct: 0
    },
    {
      question: "Quale dei seguenti dispositivi è classificato principalmente come periferica di Input?",
      options: ["La tastiera, che consente l'inserimento di dati e istruzioni.", "Il monitor, che visualizza i dati elaborati.", "L'hard disk, che memorizza programmi e dati.", "L'altoparlante, che comunica all'esterno i dati elaborati sotto forma di suoni."],
      correct: 0
    },
    {
      question: "Quale dei seguenti è un dispositivo di Output?",
      options: ["Lo schermo (monitor/display), che consente di visualizzare i dati elaborati.", "Il microfono, usato per l'input audio (es. riconoscimento vocale).", "Il trackpad, un dispositivo analogo al mouse.", "La memory card, un supporto di memorizzazione estraibile."],
      correct: 0
    },
    {
      question: "La velocità di trasferimento dei dati in una rete viene misurata in bit per secondo (bps). Cosa definisce la velocità di download?",
      options: ["La velocità di trasferimento dei dati dal server al dispositivo dell'utente.", "La velocità di trasmissione dei dati dal dispositivo dell'utente al server remoto (upload).", "La quantità di dati che un disco è in grado di leggere o scrivere in un determinato tempo.", "La capacità massima di archiviazione di un supporto (GB o TB)."],
      correct: 0
    },
    {
      question: "Quando uno studente in un ambiente di apprendimento online invia un file di una prova svolta alla piattaforma, che operazione sta compiendo?",
      options: ["Caricamento (Upload).", "Scaricamento (Download).", "Sincronizzazione dei contenuti con un altro dispositivo.", "Eliminazione permanente del file."],
      correct: 0
    },
    {
      question: "Qual è l'unità di misura utilizzata per quantificare la velocità di trasferimento dei dati (upload/download)?",
      options: ["Bit per secondo (bps) e suoi multipli (Kbps, Mbps, Gbps).", "Hertz (Hz) e suoi multipli (GHz).", "Byte e suoi multipli (KB, MB, GB, TB).", "Pixel per pollice (dpi)."],
      correct: 0
    },
    {
      question: "Qual è la precauzione più opportuna per tutelare i dati dalla perdita accidentale o intenzionale?",
      options: ["Fare regolarmente copie di sicurezza remota (backup) su supporti esterni.", "Utilizzare sistemi di autenticazione username e password per l'accesso.", "Installare un software antivirus e un firewall.", "Memorizzare i dati nella memoria RAM anziché su disco fisso."],
      correct: 0
    },
    {
      question: "Per una sicurezza ottimale, dove dovrebbero essere conservate le copie di backup?",
      options: ["In un luogo sicuro, diverso da quello in cui si trovano i dati originali.", "Nello stesso hard disk del computer, ma in una cartella cifrata.", "Solo su servizi cloud, eliminando la necessità di supporti locali.", "Sul dispositivo di controllo dotato di stato interno (come una MDT)."],
      correct: 0
    },
    {
      question: "L'operazione opposta al backup, con la quale si ricaricano gli archivi salvati su disco fisso, è detta:",
      options: ["Ripristino (Restore).", "Compressione dei dati.", "Formattazione del disco.", "Svuotamento del cestino."],
      correct: 0
    },
    {
      question: "Qual è lo scopo primario della crittografia?",
      options: ["Proteggere le informazioni rendendo un messaggio assolutamente incomprensibile (cifrato) a chi non ne ha la chiave.", "Garantire l'integrità del messaggio (che non sia modificato da terzi).", "Distruggere i dati in modo permanente da un supporto di memorizzazione.", "Determinare la complessità computazionale di un algoritmo."],
      correct: 0
    },
    {
      question: "Qual è la funzione fondamentale di un Firewall in un computer o una rete?",
      options: ["Filtrare tutte le informazioni in entrata e in uscita, applicando regole che contribuiscono alla sicurezza.", "Crittografare i messaggi di posta elettronica prima dell'invio.", "Verificare la corrispondenza dei campi in un'operazione di Stampa Unione.", "Gestire l'assegnazione automatica degli indirizzi IP (DHCP)."],
      correct: 0
    },
    {
      question: "Per accedere in modo sicuro alle risorse condivise in una rete, gli utenti autorizzati devono utilizzare:",
      options: ["Un sistema di autenticazione mediante username e password sicure.", "La crittografia a doppia chiave (chiave pubblica e privata).", "Solo un ID (identificativo) utente univoco.", "Il controllo biometrico tramite scansione dell'occhio."],
      correct: 0
    },
    {
      question: "Quale affermazione descrive correttamente la funzione dell'indirizzo IP e la natura delle risorse accessibili tramite il World Wide Web (WWW)?",
      options: [
        "L'Indirizzo IP identifica in modo univoco una risorsa in rete (es. un sito web o un computer) e il WWW comprende la vasta totalità dei contenuti testuali e multimediali accessibili a tutti tramite browser, a prescindere dalla necessità di autenticazione.",
        "L'Indirizzo IP è l'insieme di regole (protocollo) per la comunicazione, e il WWW include solo le pagine non protette (pubbliche), mentre le aree che richiedono autenticazione o cifratura (come l'e-banking o le VPN) non ne fanno parte.",
        "L'Indirizzo IP è una password complessa, e il WWW è l'unica parte di Internet non crittografata, utilizzata solo per la navigazione generica.",
        "L'Indirizzo IP è l'indirizzo univoco di una risorsa in rete, e il WWW è l'insieme di documenti ipermediali accessibili da computer dotati di browser, sebbene molte risorse richiedano un sistema di accesso protetto o l'uso di protocolli crittografati come HTTPS."
      ],
      correct: 3
    }
  ];

  useEffect(() => {
    if (quizStarted && quizQuestions.length === 0) {
      const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
      const selectedQuestions = shuffled.slice(0, 10).map(q => {
        const shuffledOptions = q.options.map((option, index) => ({ option, originalIndex: index }));
        shuffledOptions.sort(() => Math.random() - 0.5);
        return {
          ...q,
          options: shuffledOptions.map(o => o.option),
          correctIndex: shuffledOptions.findIndex(o => o.originalIndex === q.correct)
        };
      });
      setQuizQuestions(selectedQuestions);
      setStartTime(new Date());
    }
  }, [quizStarted]);

  const handleStart = () => {
    if (userName.trim() && userSurname.trim()) {
      setQuizStarted(true);
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleComplete = () => {
    const completionTime = new Date();
    setEndTime(completionTime);
    setQuizCompleted(true);
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const formatDateTime = (date) => {
    if (!date) return '';
    return date.toLocaleString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getDuration = () => {
    if (!startTime || !endTime) return '';
    const diff = Math.floor((endTime - startTime) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes}m ${seconds}s`;
  };

  const downloadProtectedPDF = () => {
    const score = calculateScore();
    const percentage = (score / quizQuestions.length) * 100;

    // Crea il PDF con protezione password
    const doc = new jsPDF({
      encryption: {
        userPassword: "Topogigio",
        ownerPassword: "Topogigio",
        userPermissions: ["print", "copy"]
      }
    });

    // Imposta font e colori
    doc.setFontSize(20);
    doc.setTextColor(41, 98, 255);
    doc.text("RISULTATI QUIZ INFORMATICA", 105, 20, { align: "center" });

    // Linea separatrice
    doc.setDrawColor(41, 98, 255);
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    // Informazioni studente
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Studente: ${userName} ${userSurname}`, 20, 35);
    doc.text(`Data e ora inizio: ${formatDateTime(startTime)}`, 20, 42);
    doc.text(`Data e ora fine: ${formatDateTime(endTime)}`, 20, 49);
    doc.text(`Durata totale: ${getDuration()}`, 20, 56);

    // Box punteggio
    doc.setFillColor(240, 240, 255);
    doc.rect(20, 65, 170, 25, 'F');
    doc.setFontSize(16);
    doc.setTextColor(41, 98, 255);
    doc.text(`PUNTEGGIO: ${score}/${quizQuestions.length}`, 105, 75, { align: "center" });
    doc.text(`PERCENTUALE: ${percentage.toFixed(0)}%`, 105, 85, { align: "center" });

    // Dettaglio risposte
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("DETTAGLIO RISPOSTE", 20, 100);
    doc.line(20, 102, 190, 102);

    let yPosition = 110;
    
    quizQuestions.forEach((q, index) => {
      // Controlla se serve una nuova pagina
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      const isCorrect = selectedAnswers[index] === q.correctIndex;
      
      // Numero domanda e stato
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      if (isCorrect) {
        doc.setTextColor(0, 150, 0);
        doc.text(`${index + 1}. ✓ CORRETTA`, 20, yPosition);
      } else {
        doc.setTextColor(200, 0, 0);
        doc.text(`${index + 1}. ✗ ERRATA`, 20, yPosition);
      }
      
      yPosition += 7;
      
      // Domanda (con gestione testo lungo)
      doc.setFont(undefined, 'normal');
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(9);
      const questionLines = doc.splitTextToSize(q.question, 170);
      doc.text(questionLines, 20, yPosition);
      yPosition += questionLines.length * 5;
      
      // Risposta data
      const userAnswer = q.options[selectedAnswers[index]] || 'Nessuna risposta';
      const userAnswerLines = doc.splitTextToSize(`Risposta data: ${userAnswer}`, 170);
      doc.text(userAnswerLines, 20, yPosition);
      yPosition += userAnswerLines.length * 5;
      
      // Risposta corretta (se sbagliata)
      if (!isCorrect) {
        doc.setTextColor(0, 100, 0);
        const correctAnswerLines = doc.splitTextToSize(`Risposta corretta: ${q.options[q.correctIndex]}`, 170);
        doc.text(correctAnswerLines, 20, yPosition);
        yPosition += correctAnswerLines.length * 5;
      }
      
      yPosition += 5;
      
      // Linea separatrice
      doc.setDrawColor(200, 200, 200);
      doc.line(20, yPosition, 190, yPosition);
      yPosition += 8;
    });

    // Footer nell'ultima pagina
    const pageCount = doc.internal.getNumberOfPages();
    doc.setPage(pageCount);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(`File protetto da password - Generato il ${formatDateTime(new Date())}`, 105, 285, { align: "center" });

    // Salva il PDF
    doc.save(`Quiz_${userName}_${userSurname}_${new Date().getTime()}.pdf`);
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Quiz Informatica</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Inserisci il tuo nome"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cognome</label>
              <input
                type="text"
                value={userSurname}
                onChange={(e) => setUserSurname(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Inserisci il tuo cognome"
              />
            </div>
            <button
              onClick={handleStart}
              disabled={!userName.trim() || !userSurname.trim()}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Inizia il Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const score = calculateScore();
    const percentage = (score / quizQuestions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Completato!</h2>
          <div className="bg-indigo-50 rounded-lg p-6 mb-6">
            <p className="text-lg font-semibold text-gray-700 mb-2">
              {userName} {userSurname}
            </p>
            <div className="text-5xl font-bold text-indigo-600 my-4">
              {score}/{quizQuestions.length}
            </div>
            <p className="text-gray-600 mb-2">
              Percentuale: {percentage.toFixed(0)}%
            </p>
            <div className="text-sm text-gray-500 mt-4 space-y-1">
              <p>Inizio: {formatDateTime(startTime)}</p>
              <p>Fine: {formatDateTime(endTime)}</p>
              <p>Durata: {getDuration()}</p>
            </div>
          </div>
          <div className="space-y-3">
            <button
              onClick={downloadProtectedPDF}
              className="w-full bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download size={20} />
              Scarica PDF Protetto
            </button>
            <p className="text-xs text-gray-500">
              Password per aprire il PDF: <span className="font-bold">Topogigio</span>
            </p>
            <button
              onClick={() => {
                setQuizStarted(false);
                setQuizCompleted(false);
                setCurrentQuestion(0);
                setSelectedAnswers({});
                setQuizQuestions([]);
                setUserName('');
                setUserSurname('');
                setStartTime(null);
                setEndTime(null);
              }}
              className="w-full bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Nuovo Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (quizQuestions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Caricamento...</div>;
  }

  const currentQ = quizQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto pt-8">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">
              {userName} {userSurname}
            </h2>
            <span className="text-indigo-600 font-bold">
              Domanda {currentQuestion + 1}/{quizQuestions.length}
            </span>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQ.question}
            </h3>
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300 bg-white'
                  }`}
                >
                  <span className="font-semibold text-indigo-600 mr-2">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
              Indietro
            </button>

            {isLastQuestion ? (
              <button
                onClick={handleComplete}
                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
              >
                Completa Quiz
                <CheckCircle size={20} />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
              >
                Avanti
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;
