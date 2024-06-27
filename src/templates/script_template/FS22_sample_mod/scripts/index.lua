local modName = g_currentModName

SampleMod = {}

function SampleMod.initialize(self, ...)
    Logging.info("Initializing mod %s...", modName)
end

SampleMod.initialize()
