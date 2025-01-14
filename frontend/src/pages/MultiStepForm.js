 <div className="form-group w-full sm:w-1/2 md:w-1/3">
      <label htmlFor="socialSecurity" className="form-label">
        Social Security # <span className="required">*</span>
      </label>
      <div className="relative">
        <input
          type="text"
          id="socialSecurity"
          name="socialSecurity"
          placeholder="Enter SSN"
          className="form-input pr-10"
          maxLength={9}
          value={formData.step1.socialSecurity} // Raw input value
          onChange={handleInputChange} // Updates state
          style={{ WebkitTextSecurity: isMasked ? "disc" : "none" }} // Masking input
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500"
          onClick={() => setIsMasked((prev) => !prev)}
        >
          {isMasked ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
