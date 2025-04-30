const Footer = () => {
    return (
      <footer className="w-full bg-blue-600 text-white py-4 mt-4 fixed bottom-0"> {/* Customize a cor e o estilo */}
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Alcateia. Todos os direitos reservados.</p>
        </div>
      </footer>
    );
  }
  
  export default Footer;